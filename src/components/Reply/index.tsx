import {
  Assets,
} from 'assets';
import {
  useNavigationUtils,
  useTheme,
} from 'hooks';
import React from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {
  ReplyProps,
} from './types';
import styles from './styles';
import { HootAction } from 'components'
const {
  components: {
    hoot: {
      more,
      avatar,
      love, reply , retweet, share, image
    },
  }
} = Assets.images;

export const Reply: React.FC<ReplyProps> = (props: ReplyProps) => {
  const {
    theme: {
      colors,
      fonts,
    },
  } = useTheme();
  const { navigateTo } = useNavigationUtils()
  return (
    <View
      style={styles.container}
    >
     <Image source={avatar} style={styles.image}/>
     <View style={styles.hootContent}>
        <View style={styles.replyContainer}>
          <View style={styles.hootHeader}>
            <View style={styles.hootHeader}>
              <Text style={styles.name}>Annie</Text>
            <Text style={styles.username}>@annie • 14s</Text>
            </View>
            <Image resizeMode="cover" source={more} style={styles.more}/>
          </View>
          <View style={styles.hootTextContainer}>
            <Text style={styles.hootText}>This is a Tiki. It can be long, or short. Depends on what you have to say. It can have some hashtags too. This is a tweet. It can be long, or short. Depends on what you have to say. It can have some hashtags too. #likethis </Text>
          </View>
        </View>
        {props.image && 
          <Image source={image} style={styles.hootImage}/>
        }
        <View style={styles.hootFooter}>
          <HootAction icon={reply} counter={1} action={() => navigateTo({name: 'Replies'})}/>
          <HootAction icon={retweet} counter={2} action={() => console.log('pressed')}/>
          <HootAction icon={love} counter={3} action={() => console.log('pressed')}/>
          <HootAction icon={share} counter={0} action={() => console.log('pressed')}/>

        </View>
     </View>
    </View>
  );
};