import md5 from "crypto-js/md5.js";
import CryptoJS from "crypto-js";

const key = "1234567812345679";
const iv = "1234567812345679";

export const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
    let e = (16 * Math.random()) | 0,
      s = "x" == t ? e : (3 & e) | 8;
    return s.toString(16);
  });
};

export const generateHash = (token, timeStamp, uuidHashed) => {
  const res1 = md5(timeStamp + uuidHashed).toString();
  const res2 = md5(res1 + token).toString();
  const res3 = md5(res2 + timeStamp).toString();
  const res4 = md5(res3).toString();
  return res4.substring(5, 20) + res2.substring(3, 17) + res3.substring(8, 11);
};

export function encryptRwts(data) {
  let parsedKey = CryptoJS.enc.Utf8.parse(key);
  let parsedIv = CryptoJS.enc.Utf8.parse(iv);

  let encrypted = CryptoJS.AES.encrypt(data, parsedKey, {
    iv: parsedIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}

export function decrypRwts(encryptedData) {
  let parsedKey = CryptoJS.enc.Utf8.parse(key);
  let parsedIv = CryptoJS.enc.Utf8.parse(iv);

  let decrypted = CryptoJS.AES.decrypt(encryptedData, parsedKey, {
    iv: parsedIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
