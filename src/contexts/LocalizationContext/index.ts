import {
  createContext,
} from 'react';
import {
  LANGUAGES,
} from 'shared';
import {
  LocalizationContextModel,
} from './types';

export const LocalizationContext = createContext<LocalizationContextModel>({
  translate: () => '',
  setLanguage: () => null,
  currentLanguage: LANGUAGES[0],
});

export * from './types';
