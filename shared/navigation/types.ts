/* eslint-disable max-len */
import * as yup from 'yup';
import {
  ScreenNames,
} from './utils';

type Union<T, K> = T & K;

// eslint-disable-next-line no-shadow
export enum NavigatorTypes {
  STACK,
  TAB,
}

export class RootNavigator<T extends NavigatorTypes, U> {
  constructor(
    private _element: Navigator<T, U>,
  ) { }

  get element() {
    return this._element;
  }
}

export class Navigator<U extends NavigatorTypes, T = {}> {
  constructor(
    private _elements: T = {} as T,
    private _navigatorType: U,
    private _defaultRoute: ScreenNames<T> | null = null,
  ) { }

  addScreen<
    ScreenName extends string,
    ScreenElement extends Navigator<NavigatorTypes, {}> | undefined = undefined,
    ScreenParams extends object | undefined = undefined,
    >(
    screen: ScreenElement extends undefined
      ? ScreenParams extends undefined
        ? Screen<NavigatorTypes, ScreenName>
        : Screen<NavigatorTypes, ScreenName, Exclude<ScreenParams, undefined>>
      : ScreenParams extends undefined
        ? NavigatorContainer<NavigatorTypes, ScreenName, Exclude<ScreenElement, undefined>>
        : NavigatorContainer<NavigatorTypes, ScreenName, Exclude<ScreenElement, undefined>, ScreenParams>,
    isDefaultRoute?: boolean,
  ): ScreenElement extends undefined
      ? ScreenParams extends undefined
        ? U extends NavigatorTypes.STACK
          ? StackNavigator<Union<T, Record<ScreenName, Screen<NavigatorTypes.STACK, ScreenName>>>>
          : TabNavigator<Union<T, Record<ScreenName, Screen<NavigatorTypes.TAB, ScreenName>>>>
        : U extends NavigatorTypes.STACK
          ? StackNavigator<Union<T, Record<ScreenName, Screen<NavigatorTypes.STACK, ScreenName, Exclude<ScreenParams, undefined>>>>>
          : TabNavigator<Union<T, Record<ScreenName, Screen<NavigatorTypes.TAB, ScreenName, Exclude<ScreenParams, undefined>>>>>
      : ScreenParams extends undefined
        ? U extends NavigatorTypes.STACK
          ? StackNavigator<Union<T, Record<ScreenName, NavigatorContainer<NavigatorTypes.STACK, ScreenName, Exclude<ScreenElement, undefined>>>>>
          : TabNavigator<Union<T, Record<ScreenName, NavigatorContainer<NavigatorTypes.TAB, ScreenName, Exclude<ScreenElement, undefined>>>>>
        : U extends NavigatorTypes.STACK
          ? StackNavigator<Union<T, Record<ScreenName, NavigatorContainer<NavigatorTypes.STACK, ScreenName, Exclude<ScreenElement, undefined>, Exclude<ScreenParams, undefined>>>>>
          : TabNavigator<Union<T, Record<ScreenName, NavigatorContainer<NavigatorTypes.TAB, ScreenName, Exclude<ScreenElement, undefined>, Exclude<ScreenParams, undefined>>>>> {
    return new Navigator({
      ...this._elements,
      [screen.name as ScreenName]: screen,
    }, this._navigatorType, isDefaultRoute ? screen.name as any : null) as any;
  }

  get elements() {
    return this._elements;
  }

  get navigatorType() {
    return this._navigatorType;
  }

  get defaultRouteName() {
    return this._defaultRoute;
  }
}

export class StackNavigator<T = {}> extends Navigator<NavigatorTypes.STACK, T> {
  constructor(
    _elements: T = {} as T,
  ) {
    super(_elements, NavigatorTypes.STACK);
  }
}

export class TabNavigator<T = {}> extends Navigator<NavigatorTypes.TAB, T> {
  constructor(
    _elements: T = {} as T,
  ) {
    super(_elements, NavigatorTypes.TAB);
  }
}

export class Screen<ScreenType extends NavigatorTypes, T extends string, K extends object | undefined = undefined> {
  _paramsSchema: yup.ObjectSchema<K> | undefined = undefined;

  constructor(private _name: T, private _screenType: ScreenType = NavigatorTypes.STACK as ScreenType) { }

  addParamsSchema<S extends object>(paramsSchema: yup.ObjectSchema<S>): Screen<ScreenType, T, S> {
    this._paramsSchema = paramsSchema as any;
    return this as any;
  }

  get name() {
    return this._name;
  }

  get paramsSchema(): K extends undefined ? undefined : Exclude<K, undefined> {
    return this._paramsSchema as any;
  }
}

export class NavigatorContainer<
  ScreenType extends NavigatorTypes,
  T extends string,
  K extends Navigator<NavigatorTypes>,
  S extends object | undefined = undefined
  > extends Screen<ScreenType, T, S> {
  constructor(_name: T, private _element: K, _screenType: ScreenType = NavigatorTypes.STACK as ScreenType) {
    super(_name, _screenType);
  }

  addParamsSchema<D extends object>(paramsSchema: yup.ObjectSchema<D>): NavigatorContainer<ScreenType, T, K, D> {
    this._paramsSchema = paramsSchema as any;
    return this as any;
  }

  get element() {
    return this._element;
  }
}
