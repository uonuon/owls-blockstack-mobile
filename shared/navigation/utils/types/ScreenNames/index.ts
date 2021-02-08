/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from 'yup';
import {
  Screen,
  NavigatorTypes,
  NavigatorContainer,
} from '../../../types';

type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T extends Object> = Exclude<
Exclude<
Exclude<Extract<ValuesOf<T>, object>, never>,
Array<any>
>
, yup.ObjectSchema>;

type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  : never) extends ((k: infer I) => void)
  ? I
  : never;

type DFBase<T, Recursor> = NameKeys<T> &
UnionToIntersection<Recursor>;

type AllValues<T extends Record<PropertyKey, PropertyKey>> = {
  [P in keyof T]: { key: P, value: T[P] }
}[keyof T];

type InvertResult<T extends Record<PropertyKey, PropertyKey>> = {
  [P in AllValues<T>['value']]: Extract<AllValues<T>, { value: P }>['key']
};

type ObjectKeysWithValue<T, S> = {
  [K in keyof T]: S;
};

type NameKeys<T> =
  T extends Screen<
  infer ScreenType,
  infer ScreenName,
  infer ScreenParams
  > | NavigatorContainer<infer ScreenType, infer ScreenName, infer ScreenElement, infer ScreenParams>
  // ? InvertResult<Pick<T, 'name'>>
    ? ObjectKeysWithValue<
    InvertResult<Pick<T, 'name'>>,
    ScreenType extends NavigatorTypes.STACK
      ? { type: ScreenType; params: Exclude<ScreenParams, undefined> }
      : { type: ScreenType; params: Exclude<ScreenParams, undefined> }
    >
    : {};

export type ScreenNames<T> = T extends any ? DFBase<T, DF2<ObjectValuesOf<T>>> : never;
type DF2<T> = T extends any ? DFBase<T, DF3<ObjectValuesOf<T>>> : never;
type DF3<T> = T extends any ? DFBase<T, DF4<ObjectValuesOf<T>>> : never;
type DF4<T> = T extends any ? DFBase<T, DF5<ObjectValuesOf<T>>> : never;
type DF5<T> = T extends any ? DFBase<T, DF6<ObjectValuesOf<T>>> : never;
type DF6<T> = T extends any ? DFBase<T, DF7<ObjectValuesOf<T>>> : never;
type DF7<T> = T extends any ? DFBase<T, DF8<ObjectValuesOf<T>>> : never;
type DF8<T> = T extends any ? DFBase<T, DF9<ObjectValuesOf<T>>> : never;
type DF9<T> = T extends any ? DFBase<T, ObjectValuesOf<T>> : never;
