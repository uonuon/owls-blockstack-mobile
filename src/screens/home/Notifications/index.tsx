import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import { Assets } from "assets";
import { useNavigationUtils, useTheme } from "hooks";
import styles from "./styles";
import { ScreenParams } from "navigation";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { query } from "utils";
import { queryPendingFollowers } from "shared/Queries";
import { useContext } from "react";
import { UserData } from "contexts";
import { User } from "components";
import { PendingFollower } from "src/components/PendingFollower";
const initialLayout = { width: Dimensions.get("window").width };

const {
  common: { logo, notification, notificationActive },
} = Assets.images;

export const Notifications: React.FC<
  BottomTabScreenProps<ScreenParams>
> = () => {
  const [index, setIndex] = React.useState(0);
  const { userData } = useContext(UserData);
  const [pendingRequests, setPendingRequests] = useState([]);

  const [routes] = React.useState([
    { key: "notifications", title: "Notifications" },
    { key: "followRequests", title: "Follow Requests" },
  ]);

  const { theme } = useTheme();
  const navigation = useNavigationUtils();

  useEffect(() => {
    query({
      myQuery: queryPendingFollowers(userData?._id),
      privateKey: userData?.appPrivateKey,
    }).then((res) => {
      setPendingRequests(
        res.data.map((fol: any) => ({
          ...fol.from,
          connectionId: fol._id,
          status: fol.status,
        }))
      );
    });
  }, [userData]);
  const FirstRoute = () => <View></View>;

  const SecondRoute = () => (
    <View style={{  flex: 1, height: '100%' }}>
      <FlatList
        data={pendingRequests}
        style={{ flex: 1, width: "100%", height: '100%' }}
        ListEmptyComponent={
          <View
            style={{
              marginTop: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Nothing found here</Text>
          </View>
        }
        renderItem={({ item }) => {
          return <PendingFollower user={item} />;
        }}
        keyExtractor={(item: any) => item._id}
      />
    </View>
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
