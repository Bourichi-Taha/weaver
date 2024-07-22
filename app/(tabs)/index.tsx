import React, { useState, useCallback, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WallpaperCard from "@/components/WallpaperCard";
import Carousel from "react-native-reanimated-carousel";
import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import { images } from "../../utils/index";
import metaData from "../../db.json";
import { useFavorites } from "@/components/favouritesContext";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [favouriteWallpapers, setFavouriteWallpapers] = useState([]);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? "dark" : "light";
  const gradientColors =
    colorScheme === "dark"
      ? ["rgba(0,0,0,1)", "rgba(0,0,0,1)", "rgba(0,0,0,0)"]
      : ["rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0)"];
  const text =
    colorScheme === "dark" ? "rgba(255, 255, 255, .35)" : "rgba(0, 0, 0, .35)";
  const nameText =
    colorScheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
  const windowWidth = useWindowDimensions().width;
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const navigation = useNavigation();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

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

  /*   const handleAddToFavourites = async (category: {
    category: string;
    image: string;
  }) => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      let favouritesArray = favourites ? JSON.parse(favourites) : [];
      const newFavourite = {
        category: category.category,
        image: category.image,
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
        console.log("Added to favourites");
      } else {
        favouritesArray.splice(index, 1);
        await AsyncStorage.setItem(
          "@userFavourites",
          JSON.stringify(favouritesArray)
        );
        console.log("Removed from favourites");
      }
    } catch (error) {
      console.error("Error adding to favourites", error);
    }
  };    const handleAddToFavourites = async (item) => {
    try {
      const favourites = await AsyncStorage.getItem("@userFavourites");
      const favouritesList = favourites ? JSON.parse(favourites) : [];
      favouritesList.push(item);
      await AsyncStorage.setItem(
        "@userFavourites",
        JSON.stringify(favouritesList)
      );
    } catch (error) {
      console.error("Error adding to favourites:", error);
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
  }, [fetchFavourites]); */

  const onRefresh = useCallback(
    () => {
      setRefreshing(true); /* 
    fetchFavourites().then(() => setRefreshing(false)); */
    },
    [
      /* fetchFavourites */
    ]
  );

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { width } = Dimensions.get("window");
  const cardWidth = width;

  return (
    <ThemedView style={[styles.container]}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView
          style={{
            paddingTop: insets.top + 100,
            flex: 1,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ThemedView style={styles.cardSlider}>
            <Carousel
              style={{
                width: Dimensions.get("window").width,
              }}
              data={metaData.carousel}
              loop
              width={windowWidth}
              pagingEnabled={true}
              snapEnabled={true}
              autoPlay={true}
              autoPlayInterval={1500}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              renderItem={({ index }) => (
                <Image
                  source={images[metaData.carousel[index]]}
                  style={{ width: cardWidth, height: 210, borderRadius: 20 }}
                />
              )}
            />
          </ThemedView>
          <ThemedView
            style={[
              styles.cardContainer,
              { paddingBottom: insets.bottom + 170 },
            ]}
          >
            {metaData.categories.flatMap((category) =>
              category.images.map((image, index) => (
                <WallpaperCard
                  key={`${category.category}_${index}`}
                  index={index}
                  title={category.category}
                  images={[images[image]]}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("wallpaperDetails", {
                      category: {
                        images: [images[image]],
                        image: image,
                        id: index,
                        category: category.category,
                      },
                      selectedImage: images[image],
                      key: image,
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
              ))
            )}
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
            <ThemedView style={styles.name}>
              <ThemedText style={[styles.nameText, { color: text }]}>
                Welcome to
              </ThemedText>
              <ThemedText style={[styles.nameTextAppName, { color: nameText }]}>
                {metaData.app_name}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.icon}>
              <Image source={images[metaData.icon_url]} style={styles.icon} />
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">
              " Spread love everywhere you go "
            </ThemedText>
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  overlayContainer: {
    width: "100%",
    height: 230,
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
    height: 40,
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
    marginTop: 20,
  },
  containerHeader: {
    backgroundColor: "transparent",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  mainContent: {},
});

export default HomeScreen;
