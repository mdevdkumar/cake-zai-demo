import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { ApiRequestOptions } from "./types";

const REQUEST_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const axiosInterceptor = {
  requestInterceptor: (config: AxiosRequestConfig) => config,
  responseInterceptor: (response: AxiosResponse) => response,
  errorInterceptor: (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      let _error = error as AxiosError;
      console.info(
        "Axios Error",
        _error.message,
        _error.response?.data,
        _error.config?.url
      );
    } else {
      console.info("Error", error);
    }

    return Promise.reject(error);
  },
};

export const apiRequest = <T>(
  url: string,
  {
    method = "get",
    headers = {},
    data,
    params = {},
    accessToken,
  }: ApiRequestOptions = {}
) => {
  const sendRequest = async () => {
    const apiInstance = axios.create();
    apiInstance.defaults.headers.common = REQUEST_HEADERS;
    apiInstance.defaults.validateStatus = (status: number) =>
      status >= 200 && status < 300;

    // Use Request Interceptors
    apiInstance.interceptors.request.use(
      axiosInterceptor.requestInterceptor,
      axiosInterceptor.errorInterceptor
    );

    // Use Response Interceptors
    apiInstance.interceptors.response.use(
      axiosInterceptor.responseInterceptor,
      axiosInterceptor.errorInterceptor
    );

    apiInstance.interceptors.request.use((config) => {
      if (accessToken) {
        headers = {
          Authorization: `Bearer ${accessToken}`,
          ...headers,
        };
      }

      config.headers = {
        ...config.headers,
        ...headers,
      };

      config.params = params;
      return config;
    });

    apiInstance.interceptors.response.use((response) => {
      return response;
    });

    return await apiInstance[method](url, data).then((response) => {
      return response;
    });
  };

  return sendRequest();
};
