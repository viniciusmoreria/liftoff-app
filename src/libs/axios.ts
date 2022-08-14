import axios from 'axios';
import type { AxiosRequestHeaders, Method } from 'axios';

import { Logger } from './logger';

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
  params?: any;
};

const axiosAPI = async ({ url, method, data, unmountSignal, params }: AxiosParams) => {
  const request = {
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
