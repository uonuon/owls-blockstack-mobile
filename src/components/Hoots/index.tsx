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
}) => (
  <FlatList
    data={hoots}
    ListHeaderComponent={ListHeaderComponent}
    ListEmptyComponent={ListEmptyComponent}
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
    renderItem={({ item }) => {
      const hoot: IHoot = item;
      return (
        <RetweetedHoot
          currentHoot={hoot}
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
    onEndReachedThreshold={0.5}
    onEndReached={loadMoreHoots}
    legacyImplementation={false}
    keyExtractor={(item: any, index) => item._id}
  />
);
