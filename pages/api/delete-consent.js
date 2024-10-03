const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateUserId, validateConsentId } = require('../../utils/validation');

/**
 * This API endpoint deletes consent of a user.
 *
 * https://api.basiq.io/reference/deleteconsent
 */

const deleteConsent = async (req, res) => {
  if (req.method === 'DELETE') {
    
      const { userId, consentId } = req.query;
      
      // Validate the userId and consentId query parameters
      if (!validateUserId(userId)) {
        res.status(400).json({ message: 'Invalid userId' });
        return;
      }

      if (!validateConsentId(consentId)) {
        res.status(400).json({ message: 'Invalid consentId' });
        return;
      }
  try {
      const { data } = await axios({
        method: 'delete',
        url: `https://au-api.basiq.io/users/${userId}/consents/${consentId}`,
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
    // Only POST is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
};

module.exports = deleteConsent;
