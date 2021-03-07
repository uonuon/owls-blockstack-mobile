import { PostHoot } from 'hooks';
import { IHoot } from './../../../shared/Types/index';
export interface ReplyProps {
  currentHoot: IHoot
  loveHoot: (id: number) => void
  retweetHoot: (hoot: PostHoot) => void
}
