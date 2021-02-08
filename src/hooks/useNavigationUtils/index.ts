import {
  StackActions,
  useNavigation,
} from '@react-navigation/native';

interface Route {
  name: string;
  params?: object;
}

const getRoutes = (...args: Route[]) => {
  const reverseArgs = args.slice(0).reverse();
  let route: any = {};
  reverseArgs.forEach((arg, index, array) => {
    if (index === array.length - 1) {
      route = {
        name: arg.name,
        params: {
          ...(arg.params || {}),
          ...route,
        },
      };
    } else {
      route = {
        screen: arg.name,
        params: {
          ...(arg.params || {}),
          ...route,
        },
      };
    }
  });
  return route;
};

export const useNavigationUtils = () => {
  const navigation = useNavigation();
  return ({
    ...navigation,
    navigateToScreen: navigation.navigate,
    resetTo: (...args: Route[]) => navigation.reset({
      index: 0,
      routes: [
        getRoutes(...args) as any,
      ],
    }),
    navigateTo: (...args: Route[]) => {
      const route = getRoutes(...args);
      navigation.navigate(route.name, route.params);
    },
    replace: (...args: Route[]) => {
      const route = getRoutes(...args);
      navigation.dispatch(StackActions.replace(route.name, route.params));
    },
  });
};
