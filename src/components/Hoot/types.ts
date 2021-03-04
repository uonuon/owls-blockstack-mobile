import { PostHoot } from 'hooks';
import { IHoot } from 'shared';
export interface HootProps {
  currentHoot: IHoot
  loveHoot: (id: number) => void
  retweetHoot: (hoot: PostHoot) => void
}
