import axios from 'axios';
import { UserTransactionsReducerActions } from '../reducers/userTransactionsReducer';
import {
  checkConnectionStatus,
  newStepError,
} from '@/components//AccountVerificationForm/AccountVerificationFormProvider';

let stepNameInProgress = '';

export function fetchUserTransactions(userId) {
  return async function (dispatch) {
    dispatch(userTransactionsLoading());
    const transactionsData = await RequestUserTransactions(userId);
    dispatch(userTransactionsLoaded(transactionsData));
  };
}

export function userTransactionsLoaded(payload) {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoaded,
    payload: payload,
  };
}

export function userTransactionsLoading() {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoading,
  };
}

async function checkJobStatus(jobId) {
  let completed = false;
  try {
    const { data } = await checkConnectionStatus({ jobId });
    const filteredSteps = data?.steps?.filter(
      ({ title }) => title === 'verify-credentials' || title === 'retrieve-accounts'
    );

    let stepError;
    for (const step of filteredSteps) {
      if (step.status === 'in-progress') {
        stepNameInProgress = step.title;
        break;
      } else if (step.status === 'failed') {
        stepError = newStepError(step.result);
        break;
      }
    }

    if (stepError) {
      return {
        jobError: true,
        stepNameInProgress,
        completed,
      };
    }

    completed = filteredSteps.every(step => step.status === 'success');

    return {
      jobError: false,
      stepNameInProgress,
      completed,
    };
  } catch (error) {
    return {
      jobError: true,
      stepNameInProgress,
      completed,
    };
  }
}

async function RequestUserTransactions(userId) {
  //Used regular variables below as setState is asynchronous and did not work well in this scenario
  //this works perfectly in this scenario as dispatch() already triggers a re-render.

  //If refresh connection returns error
  let refreshConnectionError = false;
  let dateGroupedTransactions = [];
  stepNameInProgress = 'verify-credentials';

  //Before creating income & expense summary, creating or refreshing the relevant connections is required
  await axios
    .post(`/api/refresh-connection?userId=${userId}`)
    .then(async function (refreshResponse) {
      if (refreshResponse.status === 200) {
        const jobId = refreshResponse?.data?.data[0]?.id;

        const { jobError, stepNameInProgress, completed } = await checkJobStatus(jobId);

        if (jobError) {
          refreshConnectionError = true;
          return { refreshConnectionError, stepNameInProgress };
        }

        if (completed) {
          await axios
            .get(`/api/transactions`, { params: { userId, limit: 20 } })
            .then(async function (response) {
              //Group all transactions by postDate
              dateGroupedTransactions = response.data.reduce(function (r, a) {
                if (a.postDate) {
                  r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
                  r[a.postDate.slice(0, 10)].push(a);
                  return r;
                }
              }, Object.create(null));

              dateGroupedTransactions = Object.entries(dateGroupedTransactions);
            })
            .catch(function (error) {
              console.warn(error);
              dateGroupedTransactions = [];
              refreshConnectionError = true;
            });
        }
      }
    })
    .catch(function (error) {
      console.warn(error);
      refreshConnectionError = true;
    });

  return {
    refreshConnectionError,
    dateGroupedTransactions,
    stepNameInProgress,
    isCompleted: !refreshConnectionError,
  };
}
