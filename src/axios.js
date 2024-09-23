import axios from "axios";
import md5 from "crypto-js/md5.js";
import config from "./config.js";
import { generateHash, generateUUID } from "./crypto.js";

export const buildRequestHeaders = (token) => {
  const timeStamp = new Date().getTime();
  const sid = md5(generateUUID()).toString();
  const md5Str = generateHash(token, timeStamp, sid);
  return {
    Authorization: token,
    "x-fetch-sid": sid,
    "x-fetch-tid": md5Str,
    "x-fetch-ts": timeStamp,
  };
};

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    xweb_xhr: 1,
    "User-Agent": config.api.headers.userAgent,
    Accept: "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    Referer: config.api.headers.referer,
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

apiClient.interceptors.request.use((options) => {
  if (options.token) {
    const customHeaders = buildRequestHeaders(options.token);
    Object.entries(customHeaders).forEach(([key, val]) => {
      options.headers.set(key, val);
    });
  }

  console.log("[request]", `url: ${options.url}`);

  return options;
});

export { apiClient };
