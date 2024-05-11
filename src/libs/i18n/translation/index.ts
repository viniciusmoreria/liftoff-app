import { init18n } from '@libs/i18n/init';

import pt_BR from './en.json';
import en from './pt_BR.json';

export const resources = {
  en: {
    translation: en,
  },
  pt_BR: {
    translation: pt_BR,
  },
};

export const fallbackLng = 'en';

export type LanguageCode = keyof typeof resources;

const i18n = init18n({ resources, fallbackLng });

export default i18n;
