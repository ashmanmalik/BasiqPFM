import TransactionsDataContextProvider from '../store/context/transactionContext';
import { ToastNotification } from '@/components/ToastNotification';
import { AccountVerificationFormProvider } from '@/components/AccountVerificationForm';
import '../styles.css';
import StoreProvider, { wrapper } from '@/store/StoreProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <AccountVerificationFormProvider>
          <TransactionsDataContextProvider>
          <Component {...pageProps} />
          </TransactionsDataContextProvider>
        </AccountVerificationFormProvider>
      </StoreProvider>

      <ToastNotification />
    </>
  );
}

export default wrapper.withRedux(MyApp);
