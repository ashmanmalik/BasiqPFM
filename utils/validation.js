export const userIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const limitRegex = /^[0-9]+$/;
export const snapshotIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const accountIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const consentIdRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

export const validateUserId = (userId) => {
  return userIdRegex.test(userId);
};

export const validateLimit = (limit) => {
  return limitRegex.test(limit);
};

export const validateSnapshotId = (snapshotId) => {
    return snapshotIdRegex.test(snapshotId);
  };

export const validateAccountId = (accountId) => { 
    return accountIdRegex.test(accountId);
};

export const validateConsentId = (consentId) => { 
    return consentIdRegex.test(consentId); 
};

export const validateEmail = (email) => {
    return emailRegex.test(email);
};
    
