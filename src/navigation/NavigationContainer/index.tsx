import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  Shared,
  Screen,
  NavigatorContainer,
  NavigatorTypes,
} from 'shared';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  ThemeProvider,
} from 'components';
import {
  ReusableProvider,
} from 'reusable';
import {
  UserData,
} from 'contexts';
import {
  useAuthentication,
} from 'hooks';
import {
  ROUTES,
} from '../routes';

export const generateNavigationElement = (
  element: any,
  ParentNavigator: any,
  key?: any,
) => {
  if (element instanceof NavigatorContainer) {
    return (
      <ParentNavigator.Screen name={element.name} key={key}>
        {() => generateNavigationElement(element.element, ParentNavigator)}
      </ParentNavigator.Screen>
    );
  }
  if (element instanceof Screen) {
    return (
      <ParentNavigator.Screen
        key={key}
        name={element.name}
        component={(ROUTES as any)[element.name]}
      />
    );
  }
  if (element.navigatorType === NavigatorTypes.STACK) {
    const Navigator = createStackNavigator();
    return (
      <Navigator.Navigator
        initialRouteName={element.defaultRouteName}
        headerMode="none"
      >
        {Object.values(element.elements).map((value) => generateNavigationElement(value, Navigator, (value as any).name))}
      </Navigator.Navigator>
    );
  }
  const Navigator = createBottomTabNavigator();
  return (
    <Navigator.Navigator tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#0FBBEB',
      style: {
        borderWidth: 0,
        backgroundColor: '#121212', //need change this color code as per prop
        borderTopColor: '#000000',
      },
    }} lazy={false}>
      {Object.values(element.elements).map((value) => generateNavigationElement(value, Navigator, (value as any).name))}
    </Navigator.Navigator>
  );
};

export const AppNavigationContainer: React.FC = () => {

  return (
    <NavigationContainer>
        <ThemeProvider>
              {generateNavigationElement(
                Shared.navigation.navigationContainer.element,
                null,
              )}
        </ThemeProvider>
    </NavigationContainer>
  );
};
