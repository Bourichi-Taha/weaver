import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  ImageBackground,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";

interface CategoryCardProps {
  title: string;
  image: string;
  style?: object | number | Array<object | number>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title }) => {
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 1.6 },
      shadowRadius: 5,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
    },
  });

  const colorScheme = useColorScheme();
  const gradientColors =
    colorScheme === "dark"
      ? ["rgba(255,255,255,1)", "rgba(255,255,255,0)"]
      : ["rgba(0,0,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];

  return (
    <ThemedView style={[styles.card, shadowStyle]}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.35, 1]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={styles.overlayContainer}
      >
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        {/* <ThemedText style={styles.cardDescription}>{description}</ThemedText> */}
      </LinearGradient>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 10,
    width: "94%",
    backgroundColor: "#000000",
    height: 210,
    overflow: "hidden",
  },
  cardImage: {
    height: 210,
    borderRadius: 20,
    width: "100%",
  },
  overlayContainer: {
    width: "100%",
    height: 210,
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center items vertically
    position: "absolute",
  },
  cardTitle: {
    width: "50%",
    color: "rgba(255,255,255,.8)",
    fontSize: 35,
    fontFamily: "Rancho",
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 45,
  },
  cardDescription: {
    fontSize: 25,
    fontFamily: "Rancho",
    color: "#555555",
    lineHeight: 16,
    position: "absolute",
    bottom: 40,
    left: 20,
    zIndex: 1,
  },
});

export default CategoryCard;
