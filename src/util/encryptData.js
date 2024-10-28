import CryptoJS from 'crypto-js';

// Encryption function
export const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'your_secret_key').toString();
    return encryptedData;
};

// Decryption function
export const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'your_secret_key');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};
