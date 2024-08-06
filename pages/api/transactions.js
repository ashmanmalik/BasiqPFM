const axios = require('axios');
const { validateUserId, validateLimit } = require('../../utils/validation');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves user transactions.
 *
 * https://api.basiq.io/reference/gettransactions
 */

const transactions = async (req, res) => {

  const { userId, limit } = req.query;

  // Validate the userId and limit query parameters
  if (!validateUserId(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  if (!validateLimit(limit)) {
    res.status(400).json({ message: 'Invalid limit' });
    return;
  }

  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/transactions?limit=${limit}`, {
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

module.exports = transactions;
