const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId, validateAccountId } = require('../../utils/validation');

/**
 * This API endpoint retrieves a specific account of a user.
 *
 * https://au-api.basiq.io/users/{userId}/accounts/{accountId}
 */

const getAccount = async (req, res) => {
  if (req.method === 'GET') {
      const { userId, accountId } = req.query;
      
      // Validate the userId and accountId query parameters
      if (!validateUserId(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
      }

      if (!validateAccountId(accountId)) {
        res.status(400).json({ message: 'Invalid accountId' });
        return;
      }

      try {
        const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/accounts/${accountId}`, {
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Only GET is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
};

module.exports = getAccount;
