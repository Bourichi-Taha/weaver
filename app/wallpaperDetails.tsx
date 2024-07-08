import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ParallaxScroll from "@/components/ParallaxScroll";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRoute, useNavigation } from "@react-navigation/native";

const BookDetailScreen: React.FC = () => {
  const route = useRoute();
  const { card } = route.params;
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <ParallaxScroll
      headerBackgroundColor={{
        light: "transparent",
        dark: "transparent",
      }}
      headerImage={
        <Image source={{ uri: card.image }} style={styles.wallpaperImage} />
      }
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=sbc7OUEFZIVS&format=png&color=000000",
          }}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    </ParallaxScroll>
  );
};

const styles = StyleSheet.create({
  wallpaperImage: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 50,
    zIndex: 1,
    color: "blue",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 20,
    backgroundColor: "green",
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
