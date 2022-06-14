import axios from "axios";
import type { AxiosRequestHeaders, Method } from "axios";

export type AxiosOverrides = {
  forceAccessTokenAuthorization?: boolean;
};

export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  unmountSignal?: AbortSignal;
  overrides?: AxiosOverrides;
  headers?: AxiosRequestHeaders;
};

const axiosAPI = async ({ url, method, data, unmountSignal }: AxiosParams) => {
  const request = {
    url,
    method,
    data,
    signal: unmountSignal,
  };

  try {
    return await axios(request).then((res) => res.data);
  } catch (error) {
    console.log("Failed request:", request);
    console.error(error);
    throw error;
  }
};

export { axiosAPI as axios };
