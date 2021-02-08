import React, { Fragment, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { AppNavigationContainer } from "navigation";
import { useAuthentication } from "hooks";
import { UserData } from "contexts";
import { ReusableProvider } from "reusable";
import SplashScreen from "react-native-splash-screen";

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
    <Fragment>
    <SafeAreaView style={{ flex:0, backgroundColor: 'black' }} />
    <SafeAreaView  style={styles.appContainer}>
        <UserData.Provider value={data}>
          <ReusableProvider>
            <AppNavigationContainer />
          </ReusableProvider>
        </UserData.Provider>
      </SafeAreaView>
      <SafeAreaView style={{ flex:0, backgroundColor: '#121212' }} />
    </Fragment>
    </>
  );
};

export default App;
