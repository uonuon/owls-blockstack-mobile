import { PostHoot } from 'hooks';
import { IHoot } from 'shared';
export interface HootProps {
  currentHoot: IHoot
  loveHoot: (id: string) => void
  nextHoot: boolean
  retweetHoot: (hoot: PostHoot) => void
  isThreadHoot?: boolean
  prevHoot?: boolean
  currentHeight?: number | 0
}
