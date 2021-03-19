import { PostHoot } from 'hooks';
import { IHoot } from 'shared';
export interface HootProps {
  currentHoot: IHoot
  loveHoot: (id: string) => void
  retweetHoot: (hoot: PostHoot) => void
}
