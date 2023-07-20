import CryptoJS from 'crypto-js';
import convert from 'convert';

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

export const _convertBits = (bits) => {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;

  if (bits < kilobyte) {
    return `${bits} b`;
  } else if (bits < megabyte) {
    const sizeInKB = (bits / kilobyte).toFixed(2);
    return `${sizeInKB} KB`;
  } else if (bits < gigabyte) {
    const sizeInMB = (bits / megabyte).toFixed(2);
    return `${sizeInMB} MB`;
  } else {
    const sizeInGB = (bits / gigabyte).toFixed(2);
    return `${sizeInGB} GB`;
  }
}

export const _formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export const truncateText = text => {
  const maxLength = 15;
  if(text.length > maxLength){
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

export const _getFileHash = (file) => {
  let _hash;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const buffer = reader.result;
    crypto.subtle.digest("SHA-256", buffer)
    .then(hash => {
      const hexHash = Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
      // console.log(hexHash)
      _hash = hexHash;
    })
  }
  return _hash;
}