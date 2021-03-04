import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { Image, View, Text } from "react-native";
import { Assets } from "assets";
import { useNavigationUtils, useTheme } from "hooks";
import styles from "./styles";
import { ScreenParams } from "navigation";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
const initialLayout = { width: Dimensions.get("window").width };

const {
  common: { logo, notification, notificationActive },
} = Assets.images;

export const Notifications: React.FC<
  BottomTabScreenProps<ScreenParams>
> = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "notifications", title: "Notifications" },
    { key: "followRequests", title: "Follow Requests" },
  ]);

  const { theme } = useTheme();
  const navigation = useNavigationUtils();

  const FirstRoute = () => (
    <View>
      
    </View>
  );

  const SecondRoute = () => (
    <View style={{ backgroundColor: "#673ab7", flex: 1 }} />
  );
  const renderScene = SceneMap({
    notifications: FirstRoute,
    followRequests: SecondRoute,
  });
  useEffect(() => {
    navigation.setOptions({
      title: "Notifications",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 24, height: 24 }}
          source={focused ? notificationActive : notification}
        />
      ),
    });
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.backgroundLogo} />
        <Text style={styles.title}>Notifications</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.colors.secondary }}
            activeColor={theme.colors.secondary}
            inactiveColor={theme.colors.onSurfaceMediumEmphasis}
            style={{ backgroundColor: theme.colors.elevation02dp }}
          />
        )}
      />
    </ScrollView>
  );
};
