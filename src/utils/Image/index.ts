import {
  useMemo,
} from 'react';
import {
  IUser,
} from 'shared';

export const convertGaiaDataURLToFile = (url: string): Promise<File[]> => {
  const isDataUrl = url.slice(0, 4) === 'data';
  const urlTrail = isDataUrl ? '' : `?_=${new Date().getTime()}`;
  return fetch(url + urlTrail)
    .then((res) => res.json())
    .then((base64) => fetch(base64)
      .then((res2) => res2.blob())
      .then((blob) => [
        new File([blob], 'File name', {
          type: blob.type || 'image',
        }),
      ]));
};

export const convertDataURLToFile = (url: string): Promise<File[]> => {
  const isDataUrl = url.slice(0, 4) === 'data';
  const urlTrail = isDataUrl ? '' : `?_=${new Date().getTime()}`;
  return fetch(url + urlTrail)
    .then((res) => res.blob())
    .then((blob) => [new File([blob], 'File name', {
      type: blob.type || 'image',
    })]);
};

export const readAsBase64 = (file: File | Blob): Promise<string> => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (ev: any) => resolve(ev.target.result);
  reader.readAsDataURL(file);
});
export const useGetFileSize = (fileSize: number, decimals = 2) => useMemo(() => {
  if (fileSize === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(fileSize) / Math.log(k));
  return `${parseFloat((fileSize / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}, [fileSize]);

const getProfile = (userData: IUser) => (typeof userData.profile === 'string'
  ? JSON.parse(userData.profile as any)
  : userData.profile);

export const useGetUserName = (userData: IUser) => {
  // console.log('EEE', userData)
  // const profile = getProfile(userData);
  // return useMemo(() => (
  //   (userData && userData.profile && profile.name)
  //     || (userData && userData.username.split('.')[0])
  //     || 'Anonymous'
  // ), [userData]);
};

export const getUserName = (userData: IUser) => {
  // const profile = getProfile(userData);
  // return (
  //   (userData && userData.profile && profile.name)
  //   || (userData && userData.username.split('.')[0])
  //   || 'Anonymous'
  // );
};

export const isMessageBase64 = (str: string) => str.includes('base64');
