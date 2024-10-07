import { apiRequest } from "./service";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io";

export const saveMerchant = async (data: MerchantRequestBody) => {
  const url = `${baseURL}/api:8z31w8LX/merchant`;
  const response = await apiRequest(url, { data, method: "post" });
  return response.data;
};

export const getMerchant = async (merchantId: string) => {
  const url = `${baseURL}/api:8z31w8LX/merchant/${merchantId}`;
  const response = await apiRequest(url, { method: "get" });
  return response.data;
};

export const saveTransaction = async (data: TransactionRequestBody) => {
  const url = `${baseURL}/api:9_-X0-_X/transaction`;
  const response = await apiRequest(url, { data, method: "post" });
  return response.data;
};

export const getTransaction = async (transactionId: string) => {
  const url = `${baseURL}/api:9_-X0-_X/transaction/${transactionId}`;
  const response = await apiRequest(url, { method: "get" });
  return response.data;
};

export const markTransactionAsComplete = async (data: any) => {
  const url = `${baseURL}/api:9_-X0-_X/transaction`;
  const response = await apiRequest(url, { data, method: "patch" });
  return response.data;
};

export type MerchantRequestBody = {
  merchant_id: string;
  first_name: string;
  last_name: string;
  wallet_id: string;
  virtual_account_id: string;
  pay_id: string;
  pay_id_email: string;
  json?: any;
};

export type TransactionRequestBody = {
  merchant_id: string;
  amount: number;
};
