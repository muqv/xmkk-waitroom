import { apiClient } from "./axios.js";
import { encryptRwts } from "./crypto.js";

export const getTokenInfo = async (token) => {
  const formData = new FormData();
  const response = await apiClient("/api/auth/tokenInfo", {
    method: "POST",
    data: formData,
    token,
  });

  if (response.data?.error === -1) {
    return Promise.reject({ message: response.data?.message });
  }

  return response.data?.data;
};

export const addWaitRoom = async (data, options) => {
  const response = await apiClient("/api/rntWaitRoom/add", {
    method: "POST",
    data: data.payload,
    token: data.token,
    headers: {
      rwts: encryptRwts(Date.now().toString()),
      tsd: data.snowflake,
    },
    ...options,
  });

  if (response.data?.error === -1) {
    return Promise.reject({ message: response.data?.message });
  }

  return response.data?.data;
};

export const addSysOperationRenterAddLog = async (dataId, token) => {
  const response = await apiClient("/api/sys/operationLog/renter/add", {
    method: "POST",
    data: {
      tableName: "RNT_Wait_room",
      dataId,
      operationDesc: "提交等房申请",
    },
    token,
  });

  if (response.data?.error === -1) {
    return Promise.reject({ message: response.data?.message });
  }

  return response?.data;
};

export const getWaitSetting = async (token) => {
  const response = await apiClient({
    url: "/api/base/sysWaitSetting/listpage",
    method: "POST",
    token,
  });

  if (response.data?.error !== 0) {
    return Promise.reject({ message: response.data?.message });
  }

  return response.data?.data?.content || [];
};
