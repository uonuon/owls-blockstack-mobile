import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';

export const useStickyState = (defaultValue: any, key: string) => {
  const [value, setValue] = React.useState(async () => {
    const stickyValue = await AsyncStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
