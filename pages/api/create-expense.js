const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId } = require('../../utils/validation');

/**
 * This API endpoint creates a new expense summary for a user.
 *
 * https://api.basiq.io/reference/postexpenses
 */

const createExpense = async (req, res) => {
  if (req.method === 'POST') {
    
    const { userId } = req.query;
    
    // Validate the userId query parameter
    if (!validateUserId(userId)) {
      res.status(400).json({ message: 'Invalid userId' });
      return;
    }

    try {
      const { data } = await axios({
        method: 'post',
        url: `https://au-api.basiq.io/users/${userId}/expenses`,
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: req.body,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Only POST is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
};

module.exports = createExpense;
