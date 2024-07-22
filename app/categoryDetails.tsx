import React, { useState, useCallback, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  Alert,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WallpaperCard from "@/components/WallpaperCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import metaData from "../db.json";
import { images } from "../utils/index";
import { useFavorites } from "@/components/favouritesContext";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [favouriteWallpapers, setFavouriteWallpapers] = useState([]);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const route = useRoute();
  const { category } = route.params as {
    category: { category: string; images: string[]; icon: string };
  };
  const color = colorScheme === "dark" ? "dark" : "light";
  const gradientColors =
    colorScheme === "dark"
      ? ["rgba(0,0,0,1)", "rgba(0,0,0,1)", "rgba(0,0,0,0)"]
      : ["rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0)"];
  const text =
    colorScheme === "dark" ? "rgba(255, 255, 255, .35)" : "rgba(0, 0, 0, .35)";
  const nameText =
    colorScheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";

  const [categoriesData, setCategoriesData] = useState<
    { category: string; icon: string; images: string[] }[]
  >([]);
  const navigation = useNavigation();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  useEffect(() => {
    const extractedData = metaData.categories.map((category) => ({
      category: category.category,
      icon: category.icon,
      images: category.images,
    }));
    setCategoriesData(extractedData);
  }, []);

  /*   const handleAddToFavourites = async (category: {
    category: string;
    images: string[];
  }) => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      let favouritesArray = favourites ? JSON.parse(favourites) : [];
      const newFavourite = {
        category: category.category,
        images: category.images,
      };

      const index = favouritesArray.findIndex(
        (fav: { category: string }) => fav.category === category.category
      );
      if (index === -1) {
        favouritesArray.push(newFavourite);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        Alert.alert("Success", "Added to favourites");
      } else {
        favouritesArray.splice(index, 1);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        Alert.alert("Success", "Removed from favourites");
      }
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  };

  const fetchFavourites = useCallback(async () => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      const parsedFavourites = favourites ? JSON.parse(favourites) : [];
      setFavouriteWallpapers(parsedFavourites);
    } catch (error) {
      console.error("Error retrieving favourites:", error);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFavourites().then(() => setRefreshing(false));
  }, [fetchFavourites]); */

  const handleFavoriteToggle = (category: {
    id: number;
    images: string[];
    category: string;
    image: string;
  }) => {
    if (isFavorite(category)) {
      removeFromFavorites(category);
    } else {
      addToFavorites(category);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <ThemedView style={[styles.container]}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView
          style={{
            paddingTop: insets.top + 150,
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ThemedView
            style={[
              styles.cardContainer,
              { paddingBottom: insets.bottom + 200 },
            ]}
          >
            {category.images.map((image, index) => (
              <WallpaperCard
                key={`${category.category}_${index}`}
                index={index}
                title={category.category}
                images={[images[image]]}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("wallpaperDetails", {
                    category,
                    selectedImage: images[image],
                  })
                }
                onPressHeart={() =>
                  handleFavoriteToggle({
                    images: [images[image]],
                    image: image,
                    id: index,
                    category: category.category,
                  })
                }
              />
            ))}
          </ThemedView>
        </ScrollView>
      </SafeAreaView>

      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7, 1]}
        style={styles.overlayContainer}
      >
        <ThemedView style={styles.containerHeader}>
          <ThemedView style={styles.header}>
            <View style={styles.cardImageContainer}>
              <ImageBackground
                source={images[category.icon]}
                style={styles.cardImage}
                resizeMode="cover"
              >
                <ThemedText style={styles.cardTitle}>
                  {category.category}
                </ThemedText>
              </ImageBackground>
            </View>
          </ThemedView>
        </ThemedView>
      </LinearGradient>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingBottom: -50,
  },
  overlayContainer: {
    width: "100%",
    height: 230,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "transparent",
  },
  name: {
    flex: 1,
    backgroundColor: "transparent",
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 60,
    alignSelf: "center",
  },
  nameText: {
    textAlign: "left",
    paddingVertical: 0,
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 0,
    fontFamily: "Beiruti",
  },
  nameTextAppName: {
    textAlign: "left",
    paddingVertical: 0,
    fontWeight: "500",
    fontSize: 21,
    fontFamily: "Beiruti",
  },
  titleContainer: {
    marginLeft: 0,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  cardSlider: {
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "transparent",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    gap: 10,
    borderRadius: 20,
  },
  card: {
    marginBottom: 15,
  },
  containerHeader: {
    backgroundColor: "transparent",
  },
  mainContent: {},
  cardImageContainer: {
    borderRadius: 20,
    height: 230,
    width: "100%",
    overflow: "hidden",
    shadowColor: "rgb(47, 64, 85)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardTitle: {
    width: "50%",
    color: "rgba(255,255,255,.8)",
    fontSize: 40,
    fontFamily: "Rancho",
    position: "absolute",
    top: 100,
    left: 50,
    zIndex: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 45,
  },
});

export default HomeScreen;
