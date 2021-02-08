import {
  IUser,
} from 'shared';
import React,
{
  useMemo,
  useState,
} from 'react';
import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  useGetUserName,
} from 'utils';
import {
  Assets,
} from 'assets';
import {
  defaultConfig,
} from '../useAuth/types';

const {
  common: {
    blockstackIcon,
  },
} = Assets.images;

export const useNameInitials = (name?: string) => useMemo(() => {
  const hasMoreThanAscii = [...(name || '')].some(
    (char) => char.charCodeAt(0) > 127,
  );
  const joinBy = hasMoreThanAscii ? ' ' : '';
  return (name || '')
    .split(' ')
    .map((a) => a[0])
    .join(joinBy)
    .toUpperCase();
}, [name]);

export const useGetUserImage = (userData: IUser, overrideStyles?: ViewStyle, overrideTextStyles?: TextStyle) => {
  const [data, setData] = useState<string>('');
  const userName = useGetUserName(userData);
  const nameInitials = useNameInitials(userName);
  // const profile = typeof userData.profile === 'string'
  //   ? JSON.parse(userData.profile as any)
  //   : userData.profile;
  // console.log('e', profile)

  useMemo(async () => {
    const gaiaURL = ''
    const userImages = userData?.images
      ? JSON.parse(userData?.images as any)
      : undefined;
    const image = userImages && userImages.thumbnail
      ? await fetch(gaiaURL + userImages.thumbnail, {
        method: 'GET',
      }).then((res) => res.json())
      : '';
    // const isUserImageAvailable = userData && userData.profile && profile.image && profile.image.length > 0
    //     && profile.image.filter((item) => item.name === 'avatar').length > 0;
    return (image || '').length
      ? image
      : // : isUserImageAvailable ?
    // profile.image.filter((item) => item.name === 'avatar')[0].contentUrl
      undefined;
  }, [userData]).then((res) => setData(res));

  return (
    <>
      {data ? (
        <View style={{
          width: 60,
          height: 60,
          overflow: 'hidden',
          ...overrideStyles,
        }}
        >
          <Image
            source={{
              uri: data,
            }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#979797',
            ...overrideStyles,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: '500',
              textTransform: 'capitalize',
              ...overrideTextStyles,
            }}
          >
            {nameInitials}
          </Text>
        </View>
      )}
    </>
  );
};

export const useGetBlockstackIcon = (username: string) => useMemo(() => (username.split('.').length === 2 ? (
  <Image source={blockstackIcon} />
) : (
  <Image source={blockstackIcon} />
)), [username]);
