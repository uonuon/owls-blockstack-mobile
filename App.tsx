import React, { Fragment, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { AppNavigationContainer } from "navigation";
import { useAuthentication } from "hooks";
import { UserData } from "contexts";
import { ReusableProvider } from "reusable";
import SplashScreen from "react-native-splash-screen";
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

declare const global: { HermesInternal: null | {} };
const App = () => {
  const data = useAuthentication();
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <>
    <StatusBar barStyle={'light-content'}/>
    <Fragment>
    <SafeAreaView style={{ flex:0, backgroundColor: theme.colors.elevation01dp }} />
    <SafeAreaView  style={styles.appContainer}>
        <UserData.Provider value={data}>
          <ReusableProvider>
            <AppNavigationContainer />
          </ReusableProvider>
        </UserData.Provider>
      </SafeAreaView>
      <SafeAreaView style={{ flex:0, backgroundColor: theme.colors.elevation01dp }} />
    </Fragment>
    </>
  );
};

export default App;
