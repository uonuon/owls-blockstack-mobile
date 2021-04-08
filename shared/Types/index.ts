export interface IUser {
  hubUrl: string;
  avatar: string;
  date: string;
  description: string;
  profile: any
  notificationsAllowed: boolean;
  username: string;
  fullName: string;
  _id: number;
  authId: string;
  identityAddress: string;
  isPrivate: boolean;
  publicKey: string;
  appPrivateKey: string;
  connectionId?: number;
}

export interface IHoot {
  retweets: any;
  threadParent?: IHoot | [undefined]
  createdAt: number;
  _id: number;
  avatar: string;
  image?: string;
  text: string;
  replies: any[];
  favorites: number[];
  auther: IUser;
  parentTweet?: IHoot 
}

