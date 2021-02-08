import {
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  StackScreenProps,
} from '@react-navigation/stack';
import {
  SplashScreen,
  LoginScreen,
  NewsFeed,
  Search,
  WriteHoot
} from 'screens';
import {
  NavigationFactory,
  NavigatorTypes,
  ScreenNames,
} from 'shared';

import {
  Tutorial1,
} from 'src/screens/Tutorial/Tutorial1';
import {
  Tutorial2,
} from 'src/screens/Tutorial/Tutorial2';

export type ScreenTypesAndParams = ScreenNames<NavigationFactory['navigator']>;

export type ScreenParams<T extends ScreenTypesAndParams = ScreenTypesAndParams> = {
  [K in keyof T]: T[K] extends { params: object | undefined }
    ? T[K]['params']
    : undefined;
};

export type ScreenComponents<T extends ScreenTypesAndParams> = {
  [K in keyof T]: T[K] extends { type: NavigatorTypes; params: object | undefined }
    ? T[K]['type'] extends NavigatorTypes.STACK
      ? K extends keyof ScreenParams
        ? React.FC<StackScreenProps<ScreenParams, K>>
        : undefined
      : K extends keyof ScreenParams
        ? React.FC<BottomTabScreenProps<ScreenParams, K>>
        : undefined
    : undefined;
};

export const ROUTES: ScreenComponents<ScreenTypesAndParams> = {
  home: {} as any,
  NewsFeed: NewsFeed,
  Search: Search,
  splash: SplashScreen,
  WriteHoot: WriteHoot,
  login: LoginScreen,
  tutorial1: Tutorial1,
  tutorial2: Tutorial2,
};
