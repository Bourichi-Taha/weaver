import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ParallaxScroll from "@/components/ParallaxScroll";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";

const BookDetailScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const blurTint = colorScheme === "dark" ? "dark" : "light";
  const color =
    colorScheme === "dark" ? "rgba(0, 0, 0, .85)" : "rgba(255, 255, 255, .85)";
  const themedTintColor = colorScheme === "dark" ? "white" : "black";
  return (
    <ParallaxScroll
      headerBackgroundColor={{
        light: "rgba(255, 255, 255, .85)",
        dark: "rgba(0, 0, 0, .85)",
      }}
      headerImage={
        <ImageBackground
          source={require("@/assets/images/ac63bcbac43af9f8cbc2e212ad6a6209.jpg")}
          style={styles.wallpaperImage}
        />
      }
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => console.log("Save button pressed")}
        >
          <LinearGradient
            colors={["#FE6292", "#E57373"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.optionButton}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=0hE3sSzOrkDC&format=png&color=000000",
              }}
              style={{
                width: 45,
                height: 45,
                tintColor: themedTintColor,
              }}
            />
          </LinearGradient>
          <ThemedText style={[styles.optionText, { color: themedTintColor }]}>
            Save
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => console.log("Apply button pressed")}
        >
          <LinearGradient
            colors={["#FE6292", "#E57373"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.optionButton}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=PNZhZBxdg9q0&format=png&color=000000",
              }}
              style={{
                width: 45,
                height: 45,
                tintColor: themedTintColor,
              }}
            />
          </LinearGradient>

          <ThemedText style={[styles.optionText, { color: themedTintColor }]}>
            Apply
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => console.log("Share button pressed")}
        >
          <LinearGradient
            colors={["#FE6292", "#E57373"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.optionButton}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=JanHgvvWv0rK&format=png&color=000000",
              }}
              style={{
                width: 45,
                height: 45,
                tintColor: themedTintColor,
              }}
            />
          </LinearGradient>

          <ThemedText style={[styles.optionText, { color: themedTintColor }]}>
            Share
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScroll>
  );
};

const styles = StyleSheet.create({
  wallpaperImage: {
    width: "100%",
    height: 900,
  },
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    backgroundColor: "orange",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 100,
    alignContent: "center",
    backgroundColor: "transparent",
  },
  optionButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 24,
    marginHorizontal: 30,
  },
  optionText: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: -20,
  },
});

export default BookDetailScreen;
