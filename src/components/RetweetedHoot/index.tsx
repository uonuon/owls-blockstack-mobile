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
  nextHoot,
  user,
  parentUser,
  parentTweet,
  threadParentUser,
  threadParent,
  prevHoot,
}) => {
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
        prevHoot={prevHoot}
        user={user}
        threadParent={threadParent}
        threadParentUser={threadParentUser}
        parentUser={parentUser}
        nextHoot={nextHoot}
      />
    </View>
  );
};

const enhance =  withObservables(['currentHoot'], ({currentHoot}) => {
  return {
    currentHoot: currentHoot.observe(),
    user: currentHoot.user,
  }
})

const enhanceParentTweet = withObservables(['currentHoot'], ({currentHoot}) => {
  return {
    parentTweet: currentHoot.parentTweet.id ? currentHoot.parentTweet.observe() : of$(null),
    threadParent: currentHoot.threadParent.id ? currentHoot.threadParent.observe() : of$(null),
  }
});
const enhanceParentTweetUser = withObservables(['user'], ({parentTweet, threadParent}) => {
  return {
    parentUser: parentTweet ? parentTweet.user : of$(null),
    threadParentUser: threadParent ? threadParent.user : of$(null),
  }
});

// const enhanceThreadParent = withObservables(['hoot'], ({currentHoot}) => {
//   return {
//     threadParent: currentHoot.threadParent.id ? currentHoot.threadParent.observe() : of$(null),
//   }
// });
// const enhancethreadParentUser = withObservables(['user'], ({threadParent}) => {
//   return {
//     parentUser: threadParent ? threadParent.user : of$(null)
//   }
// });

export const EnhancedRetweetedHoot = enhance(enhanceParentTweet(enhanceParentTweetUser(RetweetedHoot)));
