import React, { useContext, useEffect } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Assets } from 'assets';
import { useNavigationUtils, useTheme } from 'hooks';
import { UserData } from 'contexts';
import styles from './styles';
import { Hoot } from '../../components/Hoot';
import { Reply } from 'src/components/Reply';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {
  screens: {
    login: { logo, loginAvatar, logoMark, lock },
  },
} = Assets.images;
export const Replies: React.FC = () => {
  const { theme } = useTheme();
  const {
    common: { chevron },
  } = Assets.images;
  const { goBack } = useNavigationUtils();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Image source={chevron} style={styles.backgroundLogo} />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginLeft: '38%',
            color: '#fff',
            fontFamily: theme.fonts.regular,
            opacity: 0.6,
          }}
        >
          Replies
        </Text>
      </View>
      {/* <Hoot />
      <Reply />
      <Reply image={true} /> */}

    </ScrollView>
  );
};
