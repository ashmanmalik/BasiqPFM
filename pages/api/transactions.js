const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

/**
 * This API endpoint retrieves user transactions.
 *
 * https://api.basiq.io/reference/gettransactions
 */

const transactions = async (req, res) => {
  const { userId, limit } = req.query;

  // Regular expressions for validation
  const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  const limitRegex = /^[0-9]+$/;

  // Validate the userId and limit query parameters
  if (!userId.match(userIdRegex)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  if (!limit.match(limitRegex)) {
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

export default transactions;
