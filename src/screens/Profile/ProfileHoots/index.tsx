import React from "react";
import styles from "./styles";
import { Tabs } from "react-native-collapsible-tab-view";
import { RetweetedHoot } from "components";
import { index } from "ios/Pods/Blockstack/Javascript/profileProofs";
import { ActivityIndicator, RefreshControl } from "react-native";
import { IHoot } from "shared";
import { PostHoot } from "hooks";
interface Props {
  hoots: IHoot[];
  ListHeaderComponent?: React.ReactElement;
  loveHoot: (id: string) => void;
  retweetHoot: (hoot: PostHoot) => void;
  ListEmptyComponent?: React.ReactElement;
  loadMoreHoots: () => void;
  hasReachedEnd: boolean;
  refresh: () => void;
  isRefreshing: boolean;
}

export const ProfileHoots: React.FC<Props> = ({
  hoots,
  hasReachedEnd,
  loveHoot,
  loadMoreHoots,
  refresh,
  isRefreshing,
  retweetHoot,
}) => (
  <Tabs.FlatList
    data={hoots}
    onRefresh={refresh}
    refreshControl={
      <RefreshControl
        size={20}
        tintColor={"white"}
        refreshing={isRefreshing && hoots.length > 0}
        onRefresh={refresh}
      />
    }
    refreshing={isRefreshing}
    ListFooterComponent={
      <>
        {!hasReachedEnd && (
          <ActivityIndicator
            size={"large"}
            style={{ marginTop: 10 }}
            color={"white"}
          />
        )}
      </>
    }
    style={[styles.flatList]}
    renderItem={({ item, index }) => {
      const hoot: IHoot = item as IHoot;
      return (
        <RetweetedHoot
          currentHoot={hoot}
          nextHoot={
            hoots.length - 1 > index + 1 &&
            hoots[index + 1].threadParent &&
            hoots[index].threadParent &&
            hoots[index].threadParent[0] &&
            hoots[index + 1].threadParent[0] &&
            hoots[index].threadParent[0]._id ===
              hoots[index + 1].threadParent[0]._id
          }
          prevHoot={
            index !== 0 &&
            hoots[index].threadParent &&
            hoots[index - 1].threadParent &&
            hoots[index].threadParent[0] &&
            hoots[index - 1].threadParent[0] &&
            hoots[index].threadParent[0]._id ===
              hoots[index - 1].threadParent[0]._id
          }
          loveHoot={loveHoot}
          retweetHoot={retweetHoot}
        />
      );
    }}
    removeClippedSubviews={false}
    maxToRenderPerBatch={20}
    updateCellsBatchingPeriod={50}
    extraData={hoots}
    initialNumToRender={20}
    onEndReachedThreshold={0.1}
    onEndReached={loadMoreHoots}
    legacyImplementation={false}
    keyExtractor={(item: any, index) => item._id}
  />
);
