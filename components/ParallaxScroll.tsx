import type { PropsWithChildren, ReactElement } from "react";
import {
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
ThemedText;
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "./ThemedText";

const HEADER_HEIGHT = 500;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScroll({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const blurTint = colorScheme === "dark" ? "dark" : "light";
  const color =
    colorScheme === "dark" ? "rgba(0, 0, 0, .85)" : "rgba(255, 255, 255, .85)";
  const themedTintColor = colorScheme === "dark" ? "white" : "black";

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
      </Animated.ScrollView>
      <ThemedView style={styles.buttonsContainer}>
        <BlurView tint={blurTint} intensity={100} style={styles.blurContainer}>
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
        </BlurView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
  header: {
    height: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 190,
    position: "absolute",
    alignContent: "center",
    backgroundColor: "transparent",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    bottom: 0,
    position: "absolute",
    alignContent: "center",
    backgroundColor: "green",
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
