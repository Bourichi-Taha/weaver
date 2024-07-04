import React from "react";
import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WallpaperCard from "@/components/WallpaperCard";
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";

const cardData = [
  {
    title: "Card 1",
    description:
      "Description for Card 1. MAHA ASK IF YOU SHOULD ADD THESE OR NOT",
    image:
      "https://i.pinimg.com/236x/ac/63/bc/ac63bcbac43af9f8cbc2e212ad6a6209.jpg",
  },
  {
    title: "Card 2",
    description: "Description for Card 2",
    image:
      "https://marketplace.canva.com/EAFW7eSaHnY/1/0/900w/canva-blue-abstract-wave-phone-wallpaper-k7iCjgKKe80.jpg",
  },
  {
    title: "Card 3",
    description: "Description for Card 1",
    image:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3Jhd3BpeGVsX29mZmljZV8yNl9pbGx1c3RyYXRpb25fYXVyb3JhX2dyZWVuX3dpdGhfc3BhcmtsZV9sYW5kc181YjA0NzRiZi0zM2Q1LTQ5MWItODBlZi1kMWExMWFjOWVjYjFfMS5qcGc.jpg",
  },
  {
    title: "Card 4",
    description: "Description for Card 2",
    image:
      "https://www.idownloadblog.com/wp-content/uploads/2023/06/iOS-17-Light-by-@iSWUpdates.png",
  },
  {
    title: "Card 5",
    description: "Description for Card 1",
    image: "https://m.media-amazon.com/images/I/51PnqpTp6ML.jpg",
  },
  {
    title: "Card 6",
    description: "Description for Card 2",
    image:
      "https://i.pinimg.com/236x/c8/00/45/c800451e3ef64f9bdf8a86a6f9c26e96.jpg",
  },
  {
    title: "Card 7",
    description: "Description for Card 2",
    image:
      "https://cdn.vox-cdn.com/uploads/chorus_asset/file/22963726/The_Verge_Wallpaper_Pixel_6_Pro.jpg",
  },
  {
    title: "Card 8",
    description: "Description for Card 1",
    image:
      "https://lalweb.blob.core.windows.net/public/lakers/product-marketing/web/wallpapers/generic/2324_lal_generic_wallpapers_2048x2732_op1_pa.jpg",
  },
  {
    title: "Card 9",
    description: "Description for Card 2",
    image:
      "https://images.unsplash.com/photo-1570199764549-6ca1f8f6289c?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HomeScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#222222" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.header}>
        <ThemedView style={styles.name}>
          <ThemedText style={styles.nameText}>App Name</ThemedText>
        </ThemedView>
        <ThemedView style={styles.icon}>
          <Image
            source={{ uri: "https://i.redd.it/60la7vb17k811.jpg" }}
            style={styles.icon}
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Liked wallpapers</ThemedText>
      </ThemedView>
      <ThemedView style={styles.cardContainer}>
        {cardData.map((card, index) => (
          <WallpaperCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            style={styles.card}
          />
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  name: {
    flex: 1,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 60,
    alignSelf: "center",
  },
  nameText: {
    textAlign: "left",
    paddingVertical: 15,
    fontWeight: "800",
    fontSize: 20,
    marginLeft: 10,
  },
  titleContainer: {
    marginLeft: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  cardSlider: {
    height: 200,
    borderRadius: 20,
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderRadius: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen;
