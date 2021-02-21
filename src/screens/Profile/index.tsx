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
  FlatList,
} from "react-native";
import { HPageViewHoc } from "react-native-head-tab-view";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import { DATA, NewsFeed } from "../home";
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
     <FlatList
        data={DATA}
        style={styles.flatList}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              content={hoot.content}
              date={hoot.date}
              id={hoot.id}
              likes={hoot.likes}
              name={hoot.name}
              replies={hoot.replies}
              retweets={hoot.retweets}
              username={hoot.username}
              image={hoot.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
  </HScrollView>
);

const TweetsAndReplies = () => (
  <HScrollView index={1}>
       <FlatList
        data={DATA}
        style={styles.flatList}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              content={hoot.content}
              date={hoot.date}
              id={hoot.id}
              likes={hoot.likes}
              name={hoot.name}
              replies={hoot.replies}
              retweets={hoot.retweets}
              username={hoot.username}
              image={hoot.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
  </HScrollView>
);

const Media = () => (
  <HScrollView index={2}>
        <FlatList
        data={DATA}
        style={styles.flatList}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              content={hoot.content}
              date={hoot.date}
              id={hoot.id}
              likes={hoot.likes}
              name={hoot.name}
              replies={hoot.replies}
              retweets={hoot.retweets}
              username={hoot.username}
              image={hoot.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
  </HScrollView>
);

const Likes = () => (
  <HScrollView index={3}>
       <FlatList
        data={DATA}
        style={styles.flatList}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              content={hoot.content}
              date={hoot.date}
              id={hoot.id}
              likes={hoot.likes}
              name={hoot.name}
              replies={hoot.replies}
              retweets={hoot.retweets}
              username={hoot.username}
              image={hoot.image}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
  </HScrollView>
);

export const Profile: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const navigation = useNavigationUtils();
  const { theme } = useTheme();
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
      indicatorStyle={{ backgroundColor: colors.secondary }}
      activeColor={colors.secondary}
      tabStyle={{ height: 60, width: "auto" }}
      labelStyle={{
        fontSize: 16,
        fontFamily: theme.fonts.regular,
        fontWeight: "300",
        textTransform: "capitalize",
      }}
      inactiveColor={colors.onSurfaceMediumEmphasis}
      style={{ backgroundColor: colors.elevation01dp }}
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
      <View style={{flexDirection: 'column', width: '85%'}}>
      <Text style={styles.name}>Annie <Text style={styles.username}>@annie</Text></Text>
      <View style={{flexDirection: 'row', marginVertical: 8, width: '95%'}}><Image style={{ width: 16, height: 16, resizeMode: 'contain'}} source={calendar}/>
       <Text style={styles.date}> Joined September 2018</Text></View>
       <Text style={styles.date}>Digital Goodies Team - Web & Mobile UI/UX development; Graphics; Illustrations</Text>
       <View style={{flexDirection: 'row', marginTop: 16, }}>
         <Pressable style={{borderRadius: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor:  colors.elevation01dp, paddingVertical: 8, paddingHorizontal: 16}}>
           <Text style={{color: colors.secondaryLowContrasted, fontSize: 12,fontFamily: theme.fonts.regular,}}>118 Followers</Text>
         </Pressable>
         <Pressable style={{borderRadius: 8, marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor:  colors.elevation01dp, paddingVertical: 8, paddingHorizontal: 16}}>
           <Text style={{color: colors.common.white, fontSize: 12,fontFamily: theme.fonts.regular,}}>118 Followers</Text>
         </Pressable>
       </View>
      </View>
    </ImageBackground>
  );

  return (

      <CollapsibleHeaderTabView
        makeHeaderHeight={() => 192}
        headerRespond={true}
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
