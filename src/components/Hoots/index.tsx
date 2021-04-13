import React from "react";
import { ActivityIndicator, FlatList, ViewStyle } from "react-native";
import { IHoot } from "shared";
import { Hoot, RetweetedHoot } from "components";
import styles from "./styles";
import { PostHoot } from "hooks";

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

export const Hoots: React.FC<Props> = ({
  hoots,
  customStyles,
  ListHeaderComponent,
  ListEmptyComponent,
  loveHoot,
  retweetHoot,
  loadMoreHoots,
  hasReachedEnd,
  isRefreshing,
  refresh
}) => (
  <FlatList
    data={hoots}
    ListHeaderComponent={ListHeaderComponent}
    ListEmptyComponent={ListEmptyComponent}
    onRefresh={refresh}
    refreshing={isRefreshing}
    ListFooterComponent={
     <>
     {!hasReachedEnd &&  <ActivityIndicator
        size={"large"}
        style={{ marginTop: 10 }}
        color={"white"}
      />}
     </>
}
    style={[styles.flatList, customStyles]}
    renderItem={({ item, index }) => {
      const hoot: IHoot = item;
      return (
        <RetweetedHoot
          key={item.id}
          currentHoot={hoot}
          nextHoot={(hoots.length - 1 > index + 1) && hoots[index + 1].threadParent && hoots[index].threadParent && (hoots[index].threadParent.id === hoots[index + 1].threadParent.id)}
          prevHoot={index !== 0 && hoots[index].threadParent && hoots[index - 1].threadParent && (hoots[index].threadParent.id === hoots[index - 1].threadParent.id)}
          loveHoot={loveHoot}
          retweetHoot={retweetHoot}
        />
      );
    }}
    removeClippedSubviews={false}
    maxToRenderPerBatch={10}
    updateCellsBatchingPeriod={50}
    extraData={hoots}
    initialNumToRender={10}
    // onEndReachedThreshold={0.1}
    // onEndReached={loadMoreHoots}
    legacyImplementation={false}
    keyExtractor={(item: any, index) => item.id}
  />
);
