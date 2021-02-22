import { Hoot } from "components";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  FlatList,
} from "react-native";
import { HPageViewHoc } from "react-native-head-tab-view";
import { DATA } from "../../home";
import styles from "./styles"

const HScrollView = HPageViewHoc(ScrollView);

export const ProfileHootsLikes = () => (
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