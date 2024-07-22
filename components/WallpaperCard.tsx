import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";

interface WallpaperCardProps {
  index: number;
  title: string;
  images: string[];
  onPress: () => void;
  onPressHeart: () => void;
  style?: object | number | Array<object | number>;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 45) / 2;

const WallpaperCard: React.FC<WallpaperCardProps> = ({
  index,
  title,
  images,
  onPress,
  onPressHeart,
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const currentImage = images[currentImageIndex];

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
  }, [title]);

  const handleToggleFavourite = () => {
    onPressHeart();
    setIsFavourite(!isFavourite);
  };

  return (
    <ThemedView style={[styles.card, shadowStyle]}>
      <TouchableOpacity style={[styles.card, shadowStyle]} onPress={onPress}>
        <Image source={currentImage} style={styles.cardImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.likeButton, isFavourite && styles.likeButtonActive]}
        onPress={handleToggleFavourite}
      >
        <Image
          source={require("../assets/images/icons/icons8-favorite-100.png")}
          style={styles.likeButtonImage}
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
    overflow: "hidden",
  },
  cardImage: {
    borderRadius: 20,
    width: "100%",
    height: 250,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    tintColor: "white",
  },
  likeButtonActive: {
    backgroundColor: "rgba(234, 110, 127, .9)",
    borderRadius: 50,
  },
  likeButtonImage: {
    width: 35,
    height: 35,
    tintColor: "white",
  },
});

export default WallpaperCard;
