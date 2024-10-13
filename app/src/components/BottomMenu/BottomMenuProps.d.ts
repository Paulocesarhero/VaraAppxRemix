import { StyleProp, ViewStyle } from "react-native";
export interface BottomMenuProps {
  ViewStyleStranding?: ViewStyle;
  ViewStyleRecommendations?: ViewStyle;
  ViewStyleSettings?: ViewStyle;
}

export interface MenuItemProps {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  label: string;
}
