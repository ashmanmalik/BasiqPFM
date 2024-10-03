const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId } = require('../../utils/validation');

/**
 * This API endpoint retrieves user consents.
 *
 * https://api.basiq.io/reference/getconsents
 */

const consents = async (req, res) => {
  const { userId } = req.query;
    
  // Validate the userId query parameter
  if (!validateUserId(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }
  
  try {
    const { data } = await axios.get(`https://au-api.basiq.io/users/${userId}/consents`, {
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
};

module.exports = consents;
