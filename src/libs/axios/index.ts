import axios, { AxiosRequestConfig, Method } from 'axios';

export type AxiosParams = {
  url: string;
  method: Method;
  data?: any;
  unmountSignal?: AbortSignal;
  params?: any;
};

const axiosAPI = async ({ url, method, data, unmountSignal, params }: AxiosParams) => {
  const request: AxiosRequestConfig = {
    url,
    method,
    data,
    signal: unmountSignal,
    params,
  };

  return await axios(request).then((res) => res.data);
};

export { axiosAPI as axios };
