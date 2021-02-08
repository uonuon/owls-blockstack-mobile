import {
  IContact,
} from 'hooks';

export const TWITTER_TYPE = 'twitter';
type twitterType = typeof TWITTER_TYPE;

export const GIT_HUB_TYPE = 'github';
type githubType = typeof GIT_HUB_TYPE;

export const HACKER_NEWS_TYPE = 'hackerNews';
type hackerNewsType = typeof HACKER_NEWS_TYPE;

export const FACEBOOK_TYPE = 'facebook';
type facebookType = typeof FACEBOOK_TYPE;

export const INSTAGRAM_TYPE = 'instagram';
type instagramType = typeof INSTAGRAM_TYPE;

export const LINKED_IN_TYPE = 'linkedIn';
type linkedInType = typeof LINKED_IN_TYPE;

export interface IAccount {
  service:
  | twitterType
  | githubType
  | facebookType
  | hackerNewsType
  | instagramType
  | linkedInType;
  proofUrl: string;
}

export interface IUser {
  address: string;
  mobileNumber: string;
  twitter: string;
  linkedin: string;
  country: string;
  region: string;
  hubUrl: string;
  date: string;
  notificationsAllowed: boolean;
  isAdmin: boolean;
  username: string;
  fullName: string;
  companyName: string;
  backGround: string;
  jobTitle: string;
  _id: number;
  authId: string;
  images: { fullImage: string; thumbnail: string };
  identityAddress: string;
  publicKey: string;
  appPrivateKey: string;
  profile: {
    stxAddress: string;
    account: IAccount[];
    description?: string;
    image: Array<{ contentUrl: string; name: string }>;
    name: string;
    apps: {
      [x: string]: string;
    };
  };
}

export const TEXT_TYPE = 'textType';
export type textType = typeof TEXT_TYPE;
export const ATTACHMENT_TYPE = 'attachmentType';
export type attachmentType = typeof ATTACHMENT_TYPE;
export const IMAGE_TYPE = 'imageType';
export type imageType = typeof IMAGE_TYPE;
export const VOICE_TYPE = 'voiceType';
export type voiceType = typeof VOICE_TYPE;

export enum MessageStatus {
  PENDING_STATUS = 0,
  SUCCESS_STATUS = 1,
  FAILED_STATUS = 2,
}

export interface ITextType {
  data: string | object;
}

export interface IAttachmentType {
  data: string | object;
  name: string | object;
  size: number;
  notFound?: boolean;
}

export interface IImageType {
  data: string | object;
  name: string | object;
  size: number;
  fullImage: string | object;
  notFound?: boolean;
}

export interface IVoiceType {
  data: string | object;
  duration: number;
  notFound?: boolean;
}

export interface IAddMessage {
  'message/type': textType | attachmentType | voiceType | imageType;
  'message/content':
  | ITextType[]
  | IAttachmentType[]
  | IVoiceType[]
  | IImageType[];
}

export interface IMessage extends IAddMessage {
  _id: number;
  hideUser?: boolean;
  'message/parentMessage'?: IMessage;
  'message/user': IUser;
  'message/reaction1'?: number;
  'message/reaction2'?: number;
  status: MessageStatus;
  'message/contactGroup': IContact;
  'message/createdAt': number;
  'message/updatedAt': number;
}
