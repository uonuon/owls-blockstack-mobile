import * as React from 'react';
import {
  IUser,
} from 'shared';

export type ISetUserData = (userData: IUser) => void;

interface IContextValues {
  userData: IUser | undefined,
  setUserData: ISetUserData;
  success: boolean;
  failure: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const UserData = React.createContext<IContextValues>({
  userData: undefined,
  setUserData: (userData) => undefined,
  signIn: () => undefined,
  signOut: () => undefined,
  failure: false,
  success: false,
});
