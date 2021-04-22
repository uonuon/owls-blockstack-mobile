import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ViewStyle,
} from "react-native";
import { IHoot } from "shared";
import { Hoot, EnhancedRetweetedHoot } from "components";
import styles from "./styles";
import { PostHoot } from "hooks";
import withObservables from "@nozbe/with-observables";

interface Props {
  hoots: IHoot[];
  customStyles?: ViewStyle;
  ListHeaderComponent?: React.ReactElement;
  loveHoot: (id: string) => void;
  retweetHoot: (hoot: PostHoot) => void;
  ListEmptyComponent?: React.ReactElement;
  loadMoreHoots: () => void;
  hasReachedEnd: boolean;
  refresh: () => void;
  isRefreshing: boolean;
}

const Hoots: React.FC<Props> = ({
  hoots,
  customStyles,
  ListHeaderComponent,
  ListEmptyComponent,
  loveHoot,
  retweetHoot,
  loadMoreHoots,
  hasReachedEnd,
  isRefreshing,
  refresh,
}) => (
  <FlatList
    data={hoots}
    ListHeaderComponent={ListHeaderComponent}
    ListEmptyComponent={ListEmptyComponent}
    onRefresh={refresh}
    refreshControl={
      <RefreshControl size={20} tintColor={'white'} refreshing={isRefreshing && hoots.length > 0} onRefresh={refresh} />
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
    style={[styles.flatList, customStyles]}
    renderItem={({ item, index }) => {
      const hoot: IHoot = item;
      return (
        <EnhancedRetweetedHoot
          key={item.id}
          currentHoot={hoot}
          hoot={hoot}
          nextHoot={(hoots.length - 1 > index + 1) && hoots[index + 1].threadParent && hoots[index].threadParent && (hoots[index].threadParent.id === hoots[index + 1].threadParent.id)}
          prevHoot={index !== 0 && hoots[index].threadParent && hoots[index - 1].threadParent && (hoots[index].threadParent.id === hoots[index - 1].threadParent.id)}
          loveHoot={loveHoot}
          retweetHoot={retweetHoot}
        />
      );
    }}
    removeClippedSubviews={false}
    maxToRenderPerBatch={20}
    updateCellsBatchingPeriod={50}
    extraData={hoots}
    initialNumToRender={10}
    onEndReachedThreshold={0.1}
    onEndReached={loadMoreHoots}
    legacyImplementation={false}
    keyExtractor={(item: any, index) => item.id}
  />
);

const enhance =  withObservables(['hoots'], ({hoots}) => {
  return {
    hoots: hoots.observe(),
  }
})

export const EnhancedHoots = enhance(Hoots)