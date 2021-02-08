import { ImageSourcePropType } from "react-native";

export interface HootActionsProps {
  icon: ImageSourcePropType,
  counter: number,
  action: () => void,
}
