// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View, Image } from "react-native";

const iconUrls = {
  home: {
    active:
      "https://img.icons8.com/?size=200&id=OXVih02dFZ53&format=png&color=000000",
    inactive:
      "https://img.icons8.com/?size=200&id=OXVih02dFZ53&format=png&color=000000",
  },
  bookmark: {
    active:
      "https://img.icons8.com/?size=200&id=uEbdWKPIV0xF&format=png&color=000000",
    inactive:
      "https://img.icons8.com/?size=200&id=uEbdWKPIV0xF&format=png&color=000000",
  },
  colorFilter: {
    active:
      "https://img.icons8.com/?size=200&id=Hjs7zxtry7be&format=png&color=000000",
    inactive:
      "https://img.icons8.com/?size=200&id=Hjs7zxtry7be&format=png&color=000000",
  },
  person: {
    active:
      "https://img.icons8.com/?size=200&id=YXG86oegZMMh&format=png&color=000000",
    inactive:
      "https://img.icons8.com/?size=200&id=YXG86oegZMMh&format=png&color=000000",
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
        marginBottom: 5,
      }}
    >
      <Image
        source={{ uri: iconUrl }}
        style={{ width: 30, height: 30, tintColor: color }}
      />
    </View>
  );
}
