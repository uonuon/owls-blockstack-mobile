import { IHoot } from 'shared';
import {
  associations,
  Model,
  Relation,
} from '@nozbe/watermelondb';
import {
  date,
  field,
  relation,
  json,
  readonly,
} from '@nozbe/watermelondb/decorators';
import {
  User,
} from './UserModel';

export class Hoot extends Model {
  static table = 'hoots';

  @field('retweetsNumber')
  retweetsNumber!: number;

  @field('repliesNumber')
  repliesNumber!: number;

  @field('favoritesNumber')
  favoritesNumber!: number;

  @field('isFavorite')
  isFavorite!: boolean;

  @field('isRetweeted')
  isRetweeted!: boolean;

  @field('avatar')
  avatar!: string;

  @field('image')
  image!: string;

  @field('text')
  text!: string;

  @readonly @date('createdAt')
  createdAt!: Date;

  @readonly @date('updatedAt')
  updatedAt!: Date;

  @relation('users', 'user', {
    isImmutable: true,
  })
  user!: Relation<User>;

  @relation('hoots', 'threadParent', {
    isImmutable: true,
  })
  threadParent!: Relation<Hoot>
  
  @relation('hoots', 'parentTweet', {
    isImmutable: true,
  })
  parentTweet!: Relation<Hoot>

}