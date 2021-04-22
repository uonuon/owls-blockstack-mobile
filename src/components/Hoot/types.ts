import { PostHoot } from 'hooks';
import { IHoot, IUser } from 'shared';
import { Hoot } from 'src/db/models/HootsModel';
import { User } from 'src/db/models/UserModel';
export interface HootProps {
  currentHoot: Hoot
  loveHoot: (id: string) => void
  nextHoot: boolean
  retweetHoot: (hoot: PostHoot) => void
  isThreadHoot?: boolean
  prevHoot?: boolean
  isParent?: boolean
  threadParent?: Hoot
  parentTweet?: Hoot
  user: User
  parentUser?: User
}
