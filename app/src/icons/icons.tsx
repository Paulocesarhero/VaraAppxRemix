import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";

import React from "react";
import { ColorValue, OpaqueColorValue, TextStyle } from "react-native";

export type IconProps = {
  size?: number;
  style?: TextStyle;
  color?: string | OpaqueColorValue | ColorValue;
};

export const BackOutline: React.FC<IconProps> = (props) => (
  <Ionicons name="chevron-back-outline" {...props} />
);

export const VisibleEye: React.FC<IconProps> = (props) => (
  <Ionicons name="eye-sharp" {...props} />
);

export const NoVisibleEye: React.FC<IconProps> = (props) => (
  <Ionicons name="eye-off-sharp" {...props} />
);

export const WarningOutline: React.FC<IconProps> = (props) => (
  <Ionicons name="warning-outline" {...props} />
);

export const Warning: React.FC<IconProps> = (props) => (
  <Ionicons name="warning" {...props} />
);

export const LockPerson: React.FC<IconProps> = (props) => (
  <MaterialIcons name="lock-person" {...props} />
);

export const MailCheck: React.FC<IconProps> = (props) => (
  <FontAwesome6 name="envelope-circle-check" {...props} />
);
export const UserCircle: React.FC<IconProps> = (props) => (
  <FontAwesome6 name="circle-user" {...props} />
);

export const DotIcon: React.FC<IconProps> = (props) => (
  <Octicons name="dot-fill" {...props} />
);

export const CommentPlusOutline: React.FC<IconProps> = (props) => (
  <MaterialCommunityIcons name="comment-plus-outline" {...props} />
);

export const Bell: React.FC<IconProps> = (props) => (
  <Feather name="bell" {...props} />
);

export const Temporary: React.FC<IconProps> = (props) => (
  <FontAwesome6 name="clock-rotate-left" {...props} />
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <Feather name="search" {...props} />
);

export const HomeIcon: React.FC<IconProps> = (props) => {
  return <MaterialIcons name="home" {...props} />;
};

export const GlobeIcon: React.FC<IconProps> = (props) => {
  return <FontAwesome6 name="globe" {...props} />;
};

export const AvatarPlaceholder: React.FC<IconProps> = (props) => {
  return <MaterialIcons name="account-circle" {...props} />;
};

export const CameraIcon: React.FC<IconProps> = (props) => {
  return <AntDesign name="camerao" {...props} />;
};
