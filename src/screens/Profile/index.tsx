import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Assets } from "assets";
import { Hoot } from "components";
import { useNavigationUtils, useTheme } from "hooks";
import { ScreenParams } from "navigation";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Animated,
} from "react-native";
import { HPageViewHoc } from "react-native-head-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import { NewsFeed } from "../home";
import { Replies } from "../Replies";
import styles from "./styles";

const initialLayout = {
  width: Dimensions.get("window").width,
};
const {
  screens: {
    profile: { profile, profileDisabled, background, calendar },
  },
  components: {
    hoot: { avatar },
  },
} = Assets.images;

const HScrollView = HPageViewHoc(ScrollView);

const Tweets = () => (
  <HScrollView index={0}>
    <View style={[styles.scene, { backgroundColor: "#121212" }]}>
      <Hoot />
      <Hoot image={true} />
      <Hoot />
      <Hoot />
      <Hoot />
    </View>
  </HScrollView>
);

const TweetsAndReplies = () => (
  <HScrollView index={1}>
    <View style={[styles.scene, { backgroundColor: "#121212" }]}>
      <Hoot />
      <Hoot image={true} />
      <Hoot />
      <Hoot />
      <Hoot />
    </View>
  </HScrollView>
);

const Media = () => (
  <HScrollView index={2}>
    <View style={[styles.scene, { backgroundColor: "#121212" }]}>
      <Hoot />
      <Hoot />
      <Hoot image={true} />
      <Hoot />
      <Hoot />
    </View>
  </HScrollView>
);

const Likes = () => (
  <HScrollView index={3}>
    <View style={[styles.scene, { backgroundColor: "#121212" }]}>
      <Hoot />
      <Hoot />
      <Hoot />
      <Hoot />
      <Hoot />
    </View>
  </HScrollView>
);

export const Profile: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const navigation = useNavigationUtils();
  const {
    theme: { colors, fonts },
  } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: "tweets",
      title: "Tweets",
    },
    {
      key: "tweets_replies",
      title: "Tweets & Replies",
    },
    {
      key: "media",
      title: "Media",
    },
    {
      key: "likes",
      title: "Likes",
    },
  ]);

  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Image
          style={{ width: 16, height: 18 }}
          source={focused ? profile : profileDisabled}
        />
      ),
    });
    setRoutes([
      {
        key: "tweets",
        title: "Tweets",
      },
      {
        key: "tweets_replies",
        title: "Tweets & Replies",
      },
      {
        key: "media",
        title: "Media",
      },
      {
        key: "likes",
        title: "Likes",
      },
    ]);
  }, []);

  const renderScene = SceneMap({
    tweets: Tweets,
    tweets_replies: TweetsAndReplies,
    media: Media,
    likes: Likes,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#0FBBEB" }}
      activeColor={"#0FBBEB"}
      tabStyle={{ height: 60, width: "auto" }}
      labelStyle={{
        fontSize: 16,
        fontWeight: "300",
        textTransform: "capitalize",
      }}
      inactiveColor={"#c5c5c5"}
      style={{ backgroundColor: "#121212" }}
    />
  );

  const ProfileHeader = () => (
    <ImageBackground
      source={background}
      style={{
        height: 192,
        flexDirection: "row",
        backgroundColor:'#6c4197',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingVertical: 24,
        paddingHorizontal: 16
      }}
    >
      <Image source={avatar} style={styles.image} />
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.name}>Annie <Text style={styles.username}>@annie</Text></Text>
      <View style={{flexDirection: 'row', marginVertical: 8}}><Image style={{ width: 16, height: 16, resizeMode: 'contain'}} source={calendar}/>
       <Text style={styles.date}> Joined September 2018</Text></View>
       <Text style={styles.date}>Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations</Text>
       <View style={{flexDirection: 'row', marginTop: 16}}>
         <Pressable style={{borderRadius: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', paddingVertical: 8, paddingHorizontal: 16}}>
           <Text style={{color: '#009FE7', fontSize: 12}}>118 Followers</Text>
         </Pressable>
         <Pressable style={{borderRadius: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', paddingVertical: 8, paddingHorizontal: 16}}>
           <Text style={{color: '#fff', fontSize: 12}}>118 Followers</Text>
         </Pressable>
       </View>
      </View>
    </ImageBackground>
  );

  return (

      <CollapsibleHeaderTabView
        makeHeaderHeight={() => 192}
        headerRespond={false}
        tabbarHeight={45}
        renderTabBar={renderTabBar}
        renderScrollHeader={() => <ProfileHeader />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
  );
};
