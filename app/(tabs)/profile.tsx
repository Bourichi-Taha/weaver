import { Image, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
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
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
      </ThemedView>

      <ThemedView style={styles.featureContainer}>
        <ThemedText style={styles.featureTitle}>
          Advanced features unlocked
        </ThemedText>
        <ThemedText style={styles.featureTitle}>
          Faster image processing
        </ThemedText>
        <ThemedText style={styles.featureTitle}>Unlock 30+ styles</ThemedText>
        <TouchableOpacity style={styles.proButton}>
          <ThemedText style={styles.proButtonText}>Try Pro Now</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Support us</ThemedText>
        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=WJRf67QgKO2k&format=png&color=000000",
            }}
            style={styles.iconImage}
          />
          <ThemedText style={styles.sectionItemText}>Rate Us</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=WJRf67QgKO2k&format=png&color=000000",
            }}
            style={styles.iconImage}
          />
          <ThemedText style={styles.sectionItemText}>Contact Us</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionItem}>
          <Image
            source={{
              uri: "https://img.icons8.com/?size=100&id=WJRf67QgKO2k&format=png&color=000000",
            }}
            style={styles.iconImage}
          />
          <ThemedText style={styles.sectionItemText}>
            Share with Friends
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  featureContainer: {
    padding: 16,
  },
  featureTitle: {
    color: "black",
    fontSize: 16,
    marginBottom: 8,
  },
  proButton: {
    backgroundColor:
      "linear-gradient(90deg, rgba(246,120,121,1) 0%, rgba(250,180,81,1) 100%)",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
  },
  proButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionItemText: {
    color: "black",
    fontSize: 16,
    marginLeft: 16,
  },
  iconImage: {
    position: "absolute",
    left: -15,
    bottom: 2,
    width: 20,
    height: 20,
    tintColor: "black",
  },
});
