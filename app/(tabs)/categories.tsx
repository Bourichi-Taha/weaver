import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  BackHandler,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CategoryCard from "@/components/CategoryCard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";

const cardData = [
  {
    title: "Tic Tac Toe 2 Player: XO Game",
    image:
      "https://c4.wallpaperflare.com/wallpaper/504/621/107/angry-birds-cool-art-hd-angry-birds-wallpaper-preview.jpg",
  },
  {
    title: "2 Player games : no wifi games",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Dtjd-k_fkBKIDKoI6aSihX3PyA3uKUDMX8h4RHxjI5gY6sS1Tq3Rk4U_QlFhKJc7MJw&usqp=CAU",
  },
  {
    title: "Talking Tom Hero Dash",
    image:
      "https://wallpaper.forfun.com/fetch/8e/8efddbe9dbdf214c7ccade749ed2da4f.jpeg",
  },
  {
    title: "My Talking Tom Friends",
    image:
      "https://wallpaper.forfun.com/fetch/5f/5f6de3a5fc9eecc266681ac64beb2e8b.jpeg",
  },
  {
    title: "Stickman Party MiniGames",
    image:
      "https://w0.peakpx.com/wallpaper/591/366/HD-wallpaper-the-angry-birds-movie-2-poster.jpg",
  },
];

export default function HomeScreen() {
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

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView style={styles.mainContent}>
          <ThemedView style={styles.cardContainer}>
            {cardData.map((card, index) => (
              <CategoryCard
                key={index}
                title={card.title}
                image={card.image}
                style={styles.card}
              />
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
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
            <ThemedText type="title">Pay attention to the case !</ThemedText>
          </ThemedView>
        </ThemedView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
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
    alignItems: "center",
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
    flexShrink: 1,
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
