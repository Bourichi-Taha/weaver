import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const blurTint = colorScheme === "dark" ? "dark" : "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].activeTint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].inactiveTint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "rgb(47, 64, 85)",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            backgroundColor: "transaprent",
            borderTopWidth: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
          },
          null,
        ],
        tabBarBackground: () => (
          <BlurView
            tint={blurTint}
            intensity={100}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      {["index", "favourites", "categories", "profile"].map((screen, index) => {
        const icons = ["home", "bookmark", "colorFilter", "person"];
        const titles = ["Home", "Favourites", "Categories", "Profile"];
        return (
          <Tabs.Screen
            key={screen}
            name={screen}
            options={{
              title: titles[index],
              tabBarIcon: ({ focused }) => (
                <ThemedView style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                  <TabBarIcon
                    name={icons[index]}
                    color={focused ? "#FFFFFF" : "#999999"}
                    focused={focused}
                  />
                </ThemedView>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  iconContainerFocused: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#EA6E7F",
    padding: 15,
    paddingBottom: 11,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
});
