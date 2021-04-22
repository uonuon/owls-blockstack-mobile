import { associations, Model, Q, Relation } from "@nozbe/watermelondb";
import {
  date,
  field,
  relation,
  json,
  readonly,
  action,
} from "@nozbe/watermelondb/decorators";
import { IUser } from "shared";
import { transact } from "src/utils/Axios/transact";
import { generateGUID } from "utils";
import { database } from "..";
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

  @action async favoriteHoot(userData: IUser) {
    await this.update(hoot => {
      const hootTxn = 
        {
          _id: +hoot.id,
          favorites: [userData?._id],
        };
      if (hoot.isFavorite) {
        hoot.isFavorite = false
        hoot.favoritesNumber -= 1
        hootTxn["_action"] = "delete";
       
      } else {
        hoot.isFavorite = true
        hoot.favoritesNumber += 1
      }
      transact({
        privateKey: userData?.appPrivateKey,
        myTxn: [hootTxn],
        authId: userData?.authId,
      });
    })
  }

  @action async retweetHoot(userData: IUser) {
    await this.update(hoot => {
      const hootsCollection = this.collections.get<Hoot>('hoots');
      if (hoot.isRetweeted) {
        hoot.isRetweeted = false
        hoot.retweetsNumber -= 1
        database.action(async () => {
          const [deletedHoot] = await hootsCollection.query(Q.where('parentTweet', Q.eq(hoot.id)));
          const hootTxn = [
            {
              _id: +deletedHoot.id,
              _action: "delete",
            },
          ];
          await transact({
            privateKey: userData?.appPrivateKey,
            myTxn: hootTxn,
            authId: userData?.authId,
          });
          await deletedHoot.destroyPermanently();
        })
      } else {
        const tempId = generateGUID();
        hoot.isRetweeted = true
        hoot.retweetsNumber += 1
        database.action(async () => {
        await hootsCollection.create(h => {
          h.parentTweet.set(this)
          h.user.id = userData._id.toString();
          h.favoritesNumber = 0;
          h.retweetsNumber = 0
          h.repliesNumber = 0
          h.isRetweeted = false
          h.isFavorite = false
          h._raw.id = tempId;
        });
        const hootTxn = [
          {
            _id: `tweet$${tempId}`,
            createdAt: "#(now)",
            auther: userData?._id,
            parentTweet: +hoot.id,
          },
        ];
        await transact({
          privateKey: userData?.appPrivateKey,
          myTxn: hootTxn,
          authId: userData?.authId,
        });
      })
      }
    })
  }
}
