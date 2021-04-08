export interface IFlureeContact {
  _id: number;
  lastMessage?: IFlureeRelation;
  member1: IFlureeRelation;
  status2: string;
  publicKey: string;
  member2: IFlureeRelation;
  lastSeenMessage2?: IFlureeRelation;
  privateKey1: string;
  privateKey2: string;
  lastSeenMessage1?: IFlureeRelation;
  status1: string;
  createdAt: number;
  updatedAt: number;
}

export interface IFlureeUser {
  mobileNumber?: string;
  companyName?: string;
  _id: number;
  country?: string;
  notificationsAllowed?: boolean;
  backGround?: string;
  username: string;
  auth?: IFlureeRelation[];
  profile: string;
  publicKey: string;
  twitter?: string;
  linkedin?: string;
  address?: string;
  region?: string;
  jobTitle?: string;
  images?: string;
  date?: string;
  facebook?: string;
  createdAt: number;
  updatedAt: number;
}

export interface IFlureeRelation {
  _id: number;
}

export interface IMessageResponse {
  _id: number;
  content: string[];
  type: string;
  createdAt: number;
  updatedAt: number;
  contactGroup: IFlureeRelation
  user: IFlureeRelation;
  reaction2?: number;
  reaction1?: number;
  parentMessage?: IFlureeRelation;
}
export interface IRawContact {
  _changed: string;
  _status: string;
  created_at: number;
  friendPredicate: string;
  id: string;
  isChatArchived1: boolean;
  isChatArchived2: boolean;
  isLocked?: any;
  lastMessage: string;
  lastSeenMessage1?: any;
  lastSeenMessage2?: any;
  member1: string;
  member2: string;
  myPredicate: string;
  privateKey1: string;
  privateKey2: string;
  publicKey: string;
  remoteId?: string;
  status1: string;
  status2: string;
  updated_at: number;
}

export interface IRawMessage {
  _changed: string;
  _status: string;
  contactGroup: string;
  content: string;
  created_at: number;
  id: string;
  parentMessage?: any;
  reaction1: number;
  remoteId?: string;
  reaction2: number;
  type: string;
  updated_at: number;
  user: string;
}
