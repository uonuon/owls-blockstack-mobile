import {
  Model,
} from '@nozbe/watermelondb';
import {
  field,
  date,
} from '@nozbe/watermelondb/decorators';

export class User extends Model {
  static table = 'users';
  
  @field('hubUrl')
  hubUrl!: string;

  @date('date')
  date!: Date;

  @field('notificationsAllowed')
  notificationsAllowed!: boolean;

  @field('authId')
  authId!: string;
  
  @field('description')
  description!: string;

  @field('avatar')
  avatar!: string;

  @field('_id')
  _id!: number;

  @field('isPrivate')
  isPrivate!: boolean;

  @field('identityAddress')
  identityAddress!: string;
  
  @field('username')
  username!: string;

  @field('appPrivateKey')
  appPrivateKey!: string;

  @field('connectionId')
  connectionId!: number;

  @field('connectionStatus')
  connectionStatus!: string;

  @field('fullName')
  fullName!: string;

  @field('publicKey')
  publicKey!: string;

  @field('profile')
  profile?: string;

}
