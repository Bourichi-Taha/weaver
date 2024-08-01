import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from "./favouritesContext";

interface WallpaperCardProps {
  index: number;
  title: string;
  images: string[];
  image: string;
  onPress: () => void;
  onPressHeart: () => void;
  isFavorite: boolean;
  style?: object | number | Array<object | number>;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 45) / 2;

const WallpaperCard: React.FC<WallpaperCardProps> = ({
  index,
  title,
  images,
  image,
  onPress,
  onPressHeart,
  isFavorite,
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

  const category = {
    id: index,
    images: images,
    category: title,
    image: image,
  };

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
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  return (
    <View style={[styles.card, shadowStyle]}>
      <TouchableOpacity style={[styles.card, shadowStyle]} onPress={onPress}>
        <Image source={currentImage} style={styles.cardImage} />
      </TouchableOpacity>
      {!isFavorite ? (
        <TouchableOpacity
          style={[styles.likeButton]}
          onPress={() => onPressHeart()}
        >
          <Image
            source={require("../assets/images/icons/icons8-favorite-100.png")}
            style={styles.likeButtonImage}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.likeButton]}
          onPress={() => onPressHeart()}
        >
          <Image
            source={require("../assets/images/icons/icons8-dislike-100.png")}
            style={styles.likeButtonImage}
          />
        </TouchableOpacity>
      )}
    </View>
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
  likeButtonImage: {
    width: 35,
    height: 35,
    tintColor: "white",
  },
});

export default WallpaperCard;
