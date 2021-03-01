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

  </HScrollView>
);