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
  auth?: any;
}

// export interface IHoot {
//   retweetsNumber: any;
//   threadParent?: IHoot | [undefined]
//   createdAt: number;
//   id: string;
//   _id: number;
//   avatar: string;
//   image?: string;
//   text: string;
//   favorites: any[];
//   repliesNumber: number;
//   favoritesNumber: number;
//   user: IUser;
//   parentTweet?: IHoot 
// }

