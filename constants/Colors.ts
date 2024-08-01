/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const activeTintColorLight = "#FFFFFF";
const inactiveTintColorLight = "#999999";
const activeTintColorDark = "#FFFFFF";
const inactiveTintColorDark = "#999999";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    activeTint: activeTintColorLight,
    inactiveTint: inactiveTintColorLight,
    icon: "#999999",
    tabIconDefault: "#999999",
    tabIconSelected: activeTintColorLight,
    tabIconNotSelected: inactiveTintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#222222",
    activeTint: activeTintColorDark,
    inactiveTint: inactiveTintColorDark,
    icon: "#999999",
    tabIconDefault: "#999999",
    tabIconSelected: activeTintColorDark,
    tabIconNotSelected: inactiveTintColorDark,
  },
};
