import axios, { AxiosRequestConfig } from 'axios';
import type { Method } from 'axios';

import { Logger } from './logger';

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

  try {
    return await axios(request).then((res) => res.data);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};

export { axiosAPI as axios };
