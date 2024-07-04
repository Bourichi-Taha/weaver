import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface CategoryCardProps {
  image: string;
  style?: object | number | Array<object | number>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image }) => {
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
  return (
    <ThemedView style={[styles.card, shadowStyle]}>
      <Image source={{ uri: image }} style={styles.cardImage} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginBottom: 15,
    width: "100%",
    height: 210,
  },
  cardImage: {
    height: 210,
    borderRadius: 20,
  },
});

export default CategoryCard;
