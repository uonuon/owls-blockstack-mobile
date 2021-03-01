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
import { HootHeader } from '../Hoot/HootHeader';
const {
  components: {
    hoot: {
      more,
      defaultAvatar,
      love, reply , retweet, share, image
    },
  }
} = Assets.images;

export const Reply: React.FC<ReplyProps> = ({ content, date, likes, name, replies, retweets, username, image}) => {
  const { navigateTo } = useNavigationUtils()
  return (
    <View
      style={styles.container}
    >
     <Image source={defaultAvatar} style={styles.image}/>
     <View style={styles.replyContent}>
        <View style={styles.replyContainer}>
          <View style={styles.replyHeader}>
            <View style={styles.replyHeader}>
              <HootHeader date={date} name={name} username={username}/>
            </View>
            <Image resizeMode="cover" source={more} style={styles.more}/>
          </View>
          <View style={styles.replyTextContainer}>
  <Text style={styles.replyText}>{content}</Text>
          </View>
        </View>
        {image && 
          <Image source={{uri: image}} style={styles.replyImage}/>
        }
        <View style={styles.replyFooter}>
          <HootAction icon={reply} counter={replies} action={() => navigateTo({name: 'Replies'})}/>
          <HootAction icon={retweet} counter={retweets} action={() => console.log('pressed')}/>
          <HootAction icon={love} counter={likes} action={() => console.log('pressed')}/>
          <HootAction icon={share} counter={0} action={() => console.log('pressed')}/>

        </View>
     </View>
    </View>
  );
};
