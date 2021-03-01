import { Hoot } from "components";
import React from "react";
import {
  ScrollView,
  FlatList,
} from "react-native";
import { HPageViewHoc } from "react-native-head-tab-view";
import { DATA } from "../../home";
import styles from "./styles"

const HScrollView = HPageViewHoc(ScrollView);

export const ProfileHoots = () => (
  <HScrollView index={0}>
     <FlatList
        data={DATA}
        style={styles.flatList}
        renderItem={({ item }) => {
          const hoot = item;
          return (
            <Hoot
              currentHoot={hoot}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
  </HScrollView>
);