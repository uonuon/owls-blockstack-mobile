import {
  NavigationFactory,
} from './routes';

export class Navigation {
  static navigationContainer = new NavigationFactory().navigator;
}

export * from './types';
export * from './routes';
export * from './utils';
