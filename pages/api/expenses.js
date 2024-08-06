const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId, validateSnapshotId } = require('../../utils/validation');

/**
 * This API endpoint retrieves user expenses.
 *
 * https://api.basiq.io/reference/getexpenses
 */

const retrieveExpense = async (req, res) => {
  const { userId, snapshotId } = req.query;

  // Validate the userId and snapshotId query parameters
  if (!validateUserId(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  if (!validateSnapshotId(snapshotId)) {
    res.status(400).json({ message: 'Invalid snapshotId' });
    return;
  }

  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/expenses/${snapshotId}`, {
      headers: {
        Authorization: await getBasiqAuthorizationHeader(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = retrieveExpense;
