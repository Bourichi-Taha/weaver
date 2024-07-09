import React, { useEffect, useState } from "react";
import { Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WallpaperCard from "@/components/WallpaperCard";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cardData = [
  {
    title: "Card 1",
    description:
      "Description for Card 1. MAHA ASK IF YOU SHOULD ADD THESE OR NOT",
    image:
      "https://i.pinimg.com/736x/04/7e/08/047e085d7da80a191c5ee1633896cc1b.jpg",
  },
  {
    title: "Card 2",
    description: "Description for Card 2",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7439fcf5-dec7-4de4-829f-fd062c0a68d4/d6o6xi2-6bc0739d-faa1-4960-bdf4-657486559c35.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc0MzlmY2Y1LWRlYzctNGRlNC04MjlmLWZkMDYyYzBhNjhkNFwvZDZvNnhpMi02YmMwNzM5ZC1mYWExLTQ5NjAtYmRmNC02NTc0ODY1NTljMzUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.J3TCxCbS51iuF9TlU40GwPtR8pbXIQn3Uam-K4S6ja0",
  },
  {
    title: "Card 3",
    description: "Description for Card 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUelavUAczUbvzA1zQnN2EUo3XSmhNwEEeDw&s",
  },
  {
    title: "Card 4",
    description: "Description for Card 2",
    image:
      "https://is.zobj.net/image-server/v1/images?r=-WREyAY8zId8CktIrkpSnanqG3lkqjp2L7RjRidarpIRBZ-y9nZvnnpCustYStE7lg9T_fSEhiu0TwJF2KLlawkyqatN5EIRymxEHht4O4a_l0wLQjtHDUgAYGtzaFyX7NYcomE1Lkw_rtX-Sd9mCc586N_64nQXWXSnyDTSJfI9DJN7q44mVzpTSrGhbf9ogBS435ztV7DZhehNBGB8AgSCPYBIzv2B6zaBhQ",
  },
  {
    title: "Card 5",
    description: "Description for Card 1",
    image:
      "https://e1.pxfuel.com/desktop-wallpaper/390/618/desktop-wallpaper-rayman-iphone-rayman-origins.jpg",
  },
  {
    title: "Card 6",
    description: "Description for Card 2",
    image:
      "https://i.pinimg.com/originals/7e/ef/fe/7eeffe5e51e6ed327f1a9dd4705f616b.jpg",
  },
  {
    title: "Card 7",
    description: "Description for Card 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdIovfe7JC1WmR4_Ek7qV5nYbIbkt3Nt3sqA&s",
  },
];

const HomeScreen = () => {
  const [favouriteWallpapers, setFavouriteWallpapers] = useState([]);
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

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favourites = await AsyncStorage.getItem("@userFavourites");
        if (favourites !== null) {
          setFavouriteWallpapers(JSON.parse(favourites));
        }
      } catch (error) {
        console.error("Error retrieving favourites:", error);
      }
    };
    fetchFavourites();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {favouriteWallpapers.length === 0 ? (
        <ThemedView
          style={[styles.backgroundContainer, { backgroundColor: color }]}
        >
          <ThemedText>
            No wallpaper was set to favourite. Discover more
          </ThemedText>
          <TouchableOpacity onPress={() => navigation.navigate("index")}>
            Here
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView
          style={[styles.backgroundContainer, { backgroundColor: color }]}
        >
          <ScrollView style={styles.mainContent}>
            <ThemedView style={styles.cardContainer}>
              {cardData.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("wallpaperDetails", { card })
                  }
                >
                  <WallpaperCard
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    style={styles.card}
                  />
                </TouchableOpacity>
              ))}
            </ThemedView>
          </ScrollView>
        </ThemedView>
      )}
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
                Country Balls: World War
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.icon}>
              <Image
                source={{ uri: "https://i.redd.it/60la7vb17k811.jpg" }}
                style={styles.icon}
              />
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">" Favourite wallpapers "</ThemedText>
          </ThemedView>
        </ThemedView>
      </LinearGradient>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "space-around",
    gap: 15,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  card: {
    marginBottom: 15,
  },
  containerHeader: {
    backgroundColor: "transparent",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  mainContent: {
    paddingTop: 220,
  },
});

export default HomeScreen;
