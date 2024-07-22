import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CategoryCard from "@/components/CategoryCard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { images } from "../../utils/index";
import metaData from "../../db.json";
import { useState, useEffect } from "react";

export default function HomeScreen() {
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

  const [categoriesData, setCategoriesData] = useState<
    { title: string; image: string; wallpapers: string[] }[]
  >([]);

  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={[styles.backgroundContainer, { backgroundColor: color }]}
      >
        <ScrollView
          style={{
            paddingTop: insets.top + 100,
            flex: 1,
          }}
        >
          <ThemedView
            style={[
              styles.cardContainer,
              { paddingBottom: insets.bottom + 170 },
            ]}
          >
            {metaData.categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.category}
                image={images[category.icon]}
                wallpapers={category.images.map((img) => images[img])}
                style={styles.card}
                onPress={() => {
                  navigation.navigate("categoryDetails", { category });
                }}
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
            <ThemedText type="title">Wallpaper categories</ThemedText>
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  mainContent: {
    paddingTop: 220,
  },
});
