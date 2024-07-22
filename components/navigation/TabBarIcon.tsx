// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View, Image } from "react-native";

const iconUrls = {
  home: {
    active: require("../../assets/images/icons/icons8-home-100.png"),
    inactive: require("../../assets/images/icons/icons8-home-100.png"),
  },
  bookmark: {
    active: require("../../assets/images/icons/icons8-favorite-100.png"),
    inactive: require("../../assets/images/icons/icons8-favorite-100.png"),
  },
  colorFilter: {
    active: require("../../assets/images/icons/icons8-themes-100.png"),
    inactive: require("../../assets/images/icons/icons8-themes-100.png"),
  },
  person: {
    active: require("../../assets/images/icons/icons8-account-100.png"),
    inactive: require("../../assets/images/icons/icons8-account-100.png"),
  },
};

interface TabBarIconProps {
  name: keyof typeof iconUrls;
  color: string;
  focused: boolean;
}

export function TabBarIcon({ name, color, focused }: TabBarIconProps) {
  const { active, inactive } = iconUrls[name];

  const iconUrl = focused ? active : inactive;
  return (
    <View
      style={{
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={iconUrl}
        style={{ width: 30, height: 30, tintColor: color }}
      />
    </View>
  );
}
