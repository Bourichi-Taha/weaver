import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const favourites = await AsyncStorage.getItem("@userFavourites");
        const favouritesArray = favourites ? JSON.parse(favourites) : [];
        const exists = favouritesArray.some((fav) => fav.title === title);
        setIsFavourite(exists);
      } catch (error) {
        console.error("Error checking if favourite", error);
      }
    };
    checkIfFavourite();
  }, []);

  const handleAddToFavourites = async () => {
    try {
      const favourites = await AsyncStorage.getItem("");
      let favouritesArray = favourites ? JSON.parse(favourites) : [];
      const newFavourite = { title, description, image };

      const exists = favouritesArray.some((fav) => fav.title === title);
      if (!exists) {
        favouritesArray.push(newFavourite);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        setIsFavourite(true);
        console.log("Added to favourites");
      } else {
        console.log("Already in favourites");
      }
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  };

  return (
    <ThemedView style={[styles.card, shadowStyle]}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <TouchableOpacity onPress={handleAddToFavourites}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=30&id=uEbdWKPIV0xF&format=png&color=000000",
          }}
          style={[styles.likeButton, isFavourite && { tintColor: "red" }]}
        />
      </TouchableOpacity>
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
