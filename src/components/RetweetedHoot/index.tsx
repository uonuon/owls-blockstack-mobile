import { Assets } from "assets";
import { usePromisedMemo, useTheme } from "hooks";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Hoot } from "components";
import { HootProps } from "../Hoot/types";
import styles from "./styles";
import { User } from "src/db/models/UserModel";
import { database } from "src/db";
import withObservables from "@nozbe/with-observables";
import { of as of$ } from 'rxjs';

const RetweetedHoot: React.FC<HootProps> = ({
  currentHoot,
  loveHoot,
  nextHoot,
  isThreadHoot,
  user,
  parentUser,
  retweetHoot,
  parentTweet,
  prevHoot,
}) => {
  const {
    theme: { colors, fonts },
  } = useTheme();
  return (
    <View style={{ paddingTop: parentTweet ? 10 : 0 }}>
      {parentTweet && (
        <Text
          style={styles.text}
        >
          {user.fullName + " Retweeted"}
        </Text>
      )}
      <Hoot
        currentHoot={currentHoot}
        parentTweet={parentTweet}
        loveHoot={loveHoot}
        prevHoot={prevHoot}
        user={user}
        parentUser={parentUser}
        nextHoot={nextHoot}
        retweetHoot={retweetHoot}
      />
    </View>
  );
};

const enhance =  withObservables(['hoot'], (props) => {
  return {
    currentHoot: props.hoot.observe(),
    user: props.hoot.user,
  }
})

const enhanceParentTweet = withObservables(['hoot'], ({currentHoot}) => {
  return {
    parentTweet: currentHoot.parentTweet.id ? currentHoot.parentTweet.observe() : of$(null),
  }
});
const enhanceParentTweetUser = withObservables(['user'], ({parentTweet}) => {
  return {
    parentUser: parentTweet ? parentTweet.user : of$(null)
  }
});
export const EnhancedRetweetedHoot = enhance(enhanceParentTweet(enhanceParentTweetUser(RetweetedHoot)))
