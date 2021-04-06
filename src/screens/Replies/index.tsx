import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Assets } from "assets";
import { useHoots, useNavigationUtils, useTheme } from "hooks";
import { UserData } from "contexts";
import styles from "./styles";
import { Hoot } from "../../components/Hoot";
import { Reply } from "src/components/Reply";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { IHoot } from "shared";
import { HootsQueriesTypes } from "shared/Queries";

export const Replies: React.FC = () => {
  const { theme } = useTheme();
  const {
    common: { chevron },
  } = Assets.images;
  const { goBack } = useNavigationUtils();
  const {
    params: { hoot, loveHoot, retweetHoot },
  } = useRoute();
  const [currentText, setText] = useState("");
  let currentHoot: IHoot = hoot;
  const { data, loading, replyToHoot } = useHoots({
    queryType: HootsQueriesTypes.HOOT_BY_ID,
    id: currentHoot._id,
  });
  const [currentImage, setImage] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={"position"}
        keyboardVerticalOffset={20}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backContainer} onPress={goBack}>
            <Image source={chevron} style={styles.backgroundLogo} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginRight: 70,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                color: "#fff",
                fontFamily: theme.fonts.regular,
                opacity: 0.6,
              }}
            >
              Replies
            </Text>
          </View>
        </View>
        <FlatList
          data={data.sort((a,b) => a.createdAt - b.createdAt)}
          ListHeaderComponent={<Hoot loveHoot={loveHoot} retweetHoot={retweetHoot} currentHoot={currentHoot} />}
          style={[styles.flatList]}
          renderItem={({ item }) => {
            const reply: IHoot = item;
            return <Reply loveHoot={loveHoot} retweetHoot={retweetHoot} currentHoot={reply} key={item.createdAt.toString()} />;
          }}
          removeClippedSubviews={false}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          legacyImplementation={false}
          keyExtractor={(item: any, index) => `${item.createdAt}${index}`}
          />
        <View style={styles.replyView}>
          <TextInput
            multiline={true}
            placeholderTextColor="#6c6c6c"
            style={{
              fontSize: 16,
              width: "100%",
              padding: 16,
              color: "white",
              textAlignVertical: "center",
              justifyContent: "center",
              borderRadius: 8,
              paddingTop: 16,
              alignItems: "center",
              backgroundColor: theme.colors.elevation03dp,
              fontFamily: theme.fonts.regular,
            }}
            numberOfLines={5}
            value={currentText}
            focusable={true}
            onChangeText={(text) => {
              if (text.length <= 180) {
                setText(text);
              }
            }}
            placeholder="Write a reply..."
          />
          <TouchableOpacity
            disabled={currentText.length === 0}
            onPress={() =>
              replyToHoot(currentText, currentImage, currentHoot._id).then(
                setText("")
              )
            }
            style={[
              styles.postHoot,
              {
                backgroundColor:
                  currentText.length > 0
                    ? theme.colors.secondaryHighContrasted
                    : theme.colors.secondary,
              },
            ]}
          >
            <Text
              style={[
                styles.hootText,
                { opacity: currentText.length > 0 ? 1 : 0.38 },
              ]}
            >
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
