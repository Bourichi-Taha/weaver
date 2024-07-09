import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  useColorScheme,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const windowHeight = Dimensions.get("window").height;

const HEADER_HEIGHT = 300;

const BookDetailScreen: React.FC = () => {
  const colorScheme = useColorScheme() ?? "light";
  const route = useRoute();
  const { card } = route.params;
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const blurTint = colorScheme === "dark" ? "dark" : "light";
  const themedTintColor = colorScheme === "dark" ? "white" : "black";
  const themedBgColor = colorScheme === "dark" ? "black" : "white";

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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BlurView
          tint={blurTint}
          intensity={100}
          style={{
            borderRadius: 50,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            height: 50,
            width: 50,
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=8u3M3CAXeeZB&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
                tintColor: "white",
              }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={{ backgroundColor: themedBgColor }}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image source={{ uri: card.image }} style={styles.wallpaperImage} />
        </Animated.View>
      </Animated.ScrollView>
      <View style={styles.buttonsContainer}>
        <BlurView
          tint={blurTint}
          intensity={100}
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 100,
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => console.log("like button pressed")}
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
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Like
            </ThemedText>
          </TouchableOpacity>
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
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
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
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>

            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Set as
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
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>

            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Share
            </ThemedText>
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginTop: 30,
    marginLeft: 20,
    position: "absolute",
    zIndex: 10,
  },
  blurContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  goBackButton: {
    top: 10,
    width: 45,
    height: 45,
    tintColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  header: {
    height: windowHeight,
    overflow: "hidden",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  backButton: {
    borderRadius: 50,
    width: 70,
    height: 70,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
  },
  optionButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: -20,
  },
});

export default BookDetailScreen;
