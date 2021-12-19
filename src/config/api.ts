import axios from 'axios';

import constants from './constants';

export const spacexApi = axios.create({ baseURL: constants.BASE_URL });
export const newsApi = axios.create({ baseURL: constants.NEWS_URL });
