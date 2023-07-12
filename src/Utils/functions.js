import CryptoJS from 'crypto-js';

export const getDate = () => {
  const date = new Date();
  return `${date.toDateString()} at ${date.getHours()}:${date.getMinutes()}`
}

export const encryptToken = (token, key) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, key).toString();
  return encryptedToken;
};

export const decryptToken = (encryptedToken, key) => {
  const decryptedTokenBytes = CryptoJS.AES.decrypt(encryptedToken, key);
  const decryptedToken = decryptedTokenBytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};

export const _reload = () => window.location.reload();