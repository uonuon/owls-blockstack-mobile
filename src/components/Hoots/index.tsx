import React from "react";
import { FlatList, ViewStyle } from "react-native";
import { IHoot } from "shared";
import { Hoot, RetweetedHoot } from "components";
import styles from "./styles";
import { PostHoot } from "hooks";

interface Props {
  hoots: IHoot[];
  customStyles?: ViewStyle;
  ListHeaderComponent?: React.ReactElement;
  loveHoot: (id: number) => void;
  retweetHoot: (hoot: PostHoot) => void;
  ListEmptyComponent?: React.ReactElement;
}

export const Hoots: React.FC<Props> = ({
  hoots,
  customStyles,
  ListHeaderComponent,
  ListEmptyComponent,
  loveHoot,
  retweetHoot,
}) => (
  <FlatList
    data={hoots}
    ListHeaderComponent={ListHeaderComponent}
    ListEmptyComponent={ListEmptyComponent}
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
    initialNumToRender={10}
    legacyImplementation={false}
    keyExtractor={(item: any) => item._id.toString()}
  />
);
