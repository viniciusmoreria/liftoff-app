import { mapKeys, reduce } from 'lodash';
import { defineMessages } from 'react-intl';

import type MessageMap from 'i18n/i18n';

import en from '../i18n/languages/en-US';
import es from '../i18n/languages/es-CO';
import pt from '../i18n/languages/pt-BR';

export function flattenObject(nestedMessages: MessageMap) {
  return reduce(
    nestedMessages,
    (messages, message, messageKey) =>
      Object.assign(
        messages,
        mapKeys(message, (_, key) => `${messageKey}.${key}`),
      ),
    {},
  );
}

export const useInternationalization = (language = 'en') => {
  const DEFAULT_LANGUAGES_KEY = 'en';
  const LANGUAGE_MESSAGES: { [language: string]: MessageMap } = {
    en,
    es,
    pt,
  };
  const languageToUse =
    Object.keys(LANGUAGE_MESSAGES).find(
      (key) => key.toLocaleLowerCase() === language.split('-')[0],
    ) || DEFAULT_LANGUAGES_KEY;
  const messagesByLanguage = LANGUAGE_MESSAGES[languageToUse];
  const messages = defineMessages(flattenObject(messagesByLanguage));
  return [language, messages];
};
