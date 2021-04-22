import { PostHoot } from 'hooks';
import { IHoot, IUser } from 'shared';
import { Hoot } from 'src/db/models/HootsModel';
import { User } from 'src/db/models/UserModel';
export interface HootProps {
  currentHoot: Hoot
  nextHoot: boolean
  isThreadHoot?: boolean
  prevHoot?: boolean
  isParent?: boolean
  threadParentUser?: User
  threadParent?: Hoot
  parentTweet?: Hoot
  user: User
  parentUser?: User
}
