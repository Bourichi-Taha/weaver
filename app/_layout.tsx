import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreenComponent from "./SplashScreenComponent";
import IntroSliders from "./IntroSliders";
import wallpaperDetails from "./wallpaperDetails";
import categoryDetails from "./categoryDetails";
import TabLayout from "./(tabs)/_layout";
import { FavoritesProvider } from "@/components/favouritesContext";

const MyStack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Rancho: require("../assets/fonts/Rancho-Regular.ttf"),
    Abel: require("../assets/fonts/Abel-Regular.ttf"),
    Beiruti: require("../assets/fonts/Beiruti-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      setTimeout(() => SplashScreen.hideAsync(), 5000);
    }
  }, [loaded]);

  return (
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationContainer independent={true}>
          <MyStack.Navigator initialRouteName="SplashScreenComponent">
            <MyStack.Screen
              name="SplashScreenComponent"
              component={SplashScreenComponent}
              options={{ headerShown: false }}
            />
            <MyStack.Screen
              name="IntroSliders"
              component={IntroSliders}
              options={{ headerShown: false }}
            />
            <MyStack.Screen
              name="TabLayout"
              component={TabLayout}
              options={{ headerShown: false }}
            />
            <MyStack.Screen
              name="wallpaperDetails"
              component={wallpaperDetails}
              options={{ headerShown: false }}
            />
            <MyStack.Screen
              name="categoryDetails"
              component={categoryDetails}
              options={{ headerShown: false }}
            />
          </MyStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </FavoritesProvider>
  );
}
