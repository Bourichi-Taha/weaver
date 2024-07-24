import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
} from "react-native";
import WallpaperCard from "@/components/WallpaperCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import metaData from "../../db.json";
import { images } from "../../utils/index";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { BlurView } from "expo-blur";
import { useFavorites } from "@/components/favouritesContext";

const FavouritesScreen = () => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
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
  const navigation = useNavigation();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <SafeAreaView
          style={[styles.backgroundContainer, { backgroundColor: color }]}
        >
          <ScrollView
            style={{
              ...Platform.select({
                ios: {
                  paddingTop: insets.top + 90,
                },
                android: {
                  paddingTop: insets.top + 140,
                },
              }),
              paddingHorizontal: 10,
              alignContent: "center",
              flex: 1,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={[{ paddingBottom: insets.bottom + 170 }]}>
              <View style={styles.emptyCard}>
                <Image
                  source={require("../../assets/images/icons/icons8-search-for-love-100.png")}
                  style={{
                    width: 80,
                    height: 80,
                    alignSelf: "center",
                    marginVertical: 30,
                  }}
                />
              </View>
              <Text style={styles.emptyTitle}>No favourites yet</Text>
              <Text style={styles.suggestionTitle}>
                Tap on the heart to add to your favourites!
              </Text>
              <Text style={styles.suggestionTitle}>
                Add wallpapers to your favourites, see them here at a glance.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("index")}>
                <View style={styles.navigationButton}>
                  <BlurView intensity={50} style={styles.blurContainer}>
                    <LinearGradient
                      colors={["#FE6292", "#E57373"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.navigationButtonGradient}
                    >
                      <Text style={styles.navigationButtonText}>Discover</Text>
                    </LinearGradient>
                  </BlurView>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[styles.backgroundContainer, { backgroundColor: color }]}
        >
          <ScrollView
            style={{
              ...Platform.select({
                ios: {
                  paddingTop: insets.top + 100,
                },
                android: {
                  paddingTop: insets.top + 150,
                },
              }),
              flex: 1,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View
              style={[
                styles.cardContainer,
                {
                  ...Platform.select({
                    ios: {
                      paddingBottom: insets.bottom + 170,
                    },
                    android: {
                      paddingBottom: insets.bottom + 260,
                    },
                  }),
                },
              ]}
            >
              {favorites.map((category, index) => (
                <WallpaperCard
                  key={`${category.category}_${index}`}
                  index={index}
                  title={category.category}
                  images={category.images}
                  image={images[category.image]}
                  isFavorite={isFavorite(category)}
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate("wallpaperDetails", {
                      category,
                      selectedImage: images[category.image],
                      key: category.image,
                    });
                  }}
                  onPressHeart={() => {
                    if (isFavorite(category)) {
                      removeFromFavorites(category);
                    } else {
                      addToFavorites(category);
                    }
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.7, 1]}
        style={styles.overlayContainer}
      >
        <View style={styles.containerHeader}>
          <View style={styles.header}>
            <View style={styles.name}>
              <Text style={[styles.nameText, { color: text }]}>Welcome to</Text>
              <Text style={[styles.nameTextAppName, { color: nameText }]}>
                {metaData.app_name}
              </Text>
            </View>
            <View style={styles.icon}>
              <Image source={images[metaData.icon_url]} style={styles.icon} />
            </View>
          </View>
          {favorites.length === 0 ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}> </Text>
            </View>
          ) : (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                " Your top picks, always at hand. "
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  emptyCard: {
    width: 190,
    height: 150,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(153, 153, 153, 0.2)",
  },
  emptyTitle: {
    fontFamily: "Beiruti",
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  suggestionTitle: {
    fontFamily: "Beiruti",
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
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
    fontSize: 20,
    marginLeft: 0,
    fontFamily: "Beiruti",
  },
  nameTextAppName: {
    textAlign: "left",
    paddingVertical: 0,
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  mainContent: {
    paddingTop: 220,
  },
  navigationButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Beiruti",
  },
  navigationButton: {
    alignSelf: "center",
    marginTop: 50,
  },
  navigationButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  blurContainer: {
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: "Rancho",
    textAlign: "center",
  },
});

export default FavouritesScreen;
