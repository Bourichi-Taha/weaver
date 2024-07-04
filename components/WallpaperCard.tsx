import React from "react";
import { Image, StyleSheet, Dimensions, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");
const cardWidth = (width - 45) / 2;

interface WallpaperCardProps {
  title: string;
  description: string;
  image: string;
  style?: object | number | Array<object | number>;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({
  title,
  description,
  image,
}) => {
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 7,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: "#000000",
      shadowOpacity: 0.11,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 7,
    },
  });

  return (
    <ThemedView style={[styles.card, shadowStyle]}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      {/* <ThemedView style={styles.cardContent}>
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </ThemedView> */}
      <Image
        source={{
          uri: "https://img.icons8.com/?size=30&id=uEbdWKPIV0xF&format=png&color=000000",
        }}
        style={styles.likeButton}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "#ffffff",
    width: cardWidth,
    height: 250,
  },
  cardImage: {
    borderRadius: 20,
    width: "100%",
    height: 250,
  },
  cardContent: {
    padding: 5,
    height: 90,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 11,
    color: "#555555",
    lineHeight: 16,
  },

  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    tintColor: "white",
  },
});

export default WallpaperCard;
