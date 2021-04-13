import { associations, Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  relation,
  json,
  readonly,
  action,
} from "@nozbe/watermelondb/decorators";
import { User } from "./UserModel";

export class Hoot extends Model {
  static table = "hoots";

  @readonly
  @date("created_at")
  createdAt!: Date;

  @readonly
  @date("updated_at")
  updatedAt!: Date;

  @field("retweetsNumber")
  retweetsNumber!: number;

  @field("repliesNumber")
  repliesNumber!: number;

  @field("favoritesNumber")
  favoritesNumber!: number;

  @field("isFavorite")
  isFavorite!: boolean;

  @field("isRetweeted")
  isRetweeted!: boolean;

  @field("avatar")
  avatar!: string;

  @field("image")
  image!: string;

  @field("text")
  text!: string;

  @relation("users", "user", {
    isImmutable: true,
  })
  user!: Relation<User>;

  @relation("hoots", "threadParent", {
    isImmutable: true,
  })
  threadParent!: Relation<Hoot>;

  @relation("hoots", "parentTweet", {
    isImmutable: true,
  })
  parentTweet!: Relation<Hoot>;
}
