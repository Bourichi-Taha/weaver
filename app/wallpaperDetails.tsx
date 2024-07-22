import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
  useColorScheme,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import * as MediaLibrary from "expo-media-library";
import { Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../utils/index";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import WallPaperManager from "react-native-set-wallpaper";
/* import WallPaperManager from "react-native-wallpaper-manager";*/
import { useFavorites } from "@/components/favouritesContext";

const windowHeight = Dimensions.get("window").height;
const HEADER_HEIGHT = 300;

const BookDetailScreen: React.FC = () => {
  const colorScheme = useColorScheme() ?? "light";
  const route = useRoute();
  const { category, selectedImage, key } = route.params as {
    category: { images; image; id; category };
    selectedImage: string;
    key: string;
  };
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [saving, setSaving] = useState(false);
  const blurTint = colorScheme === "dark" ? "dark" : "light";
  const themedTintColor = colorScheme === "dark" ? "white" : "black";
  const themedBgColor = colorScheme === "dark" ? "black" : "white";
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  if (!category || !category.images) {
    return (
      <View style={styles.container}>
        <ThemedText>Error: Invalid category or images</ThemedText>
      </View>
    );
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const handleAddToFavourites = async (category: {
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

  const handleSaveImage = async (imageKey: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
    } else {
      try {
        setSaving(true);
        const imageAsset = images[imageKey];
        if (!imageAsset) {
          throw new Error(`Image not found for key: ${imageKey}`);
        }

        const asset = Asset.fromModule(imageAsset);
        await asset.downloadAsync();
        const imageUri = asset.localUri;

        if (!imageUri) {
          throw new Error(`Failed to resolve URI for image: ${imageKey}`);
        }

        const fileExtension = imageUri.split(".").pop();
        const fileUri =
          FileSystem.cacheDirectory + imageKey + "." + fileExtension;

        await FileSystem.copyAsync({
          from: imageUri,
          to: fileUri,
        });

        await MediaLibrary.createAssetAsync(fileUri);
        Alert.alert("Success", "Image saved to gallery!");
      } catch (error) {
        Alert.alert("Error", "Failed to save image.");
        console.error("Failed to save image", error);
      } finally {
        setSaving(false);
      }
    }
  };

  const callback = (res: { status: string; message?: string }) => {
    console.log("Response: ", res);
  };

  const handleSetWallpaper = (imageKey: string) => {
    try {
      const imageAsset = images[imageKey];
      if (!imageAsset) {
        console.log(`Image not found for key: ${imageKey}`);
        throw new Error(`Image not found for key: ${imageKey}`);
      }

      const asset = Asset.fromModule(imageAsset);

      WallPaperManager.setWallpaper({ uri: asset }, (res) => {
        console.log(res);
      });

      /* ManageWallpaper.setWallpaper(
        {
          uri: asset,
        },
        (res) => console.log("Wallpaper set:", res),
        TYPE.HOME
      ); */

      Alert.alert("Success", "Wallpaper set successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to set wallpaper.");
      console.error("Failed to set wallpaper", error);
    }
  };

  const handleShare = async (image: string) => {
    try {
      const result = await Share.share({
        url: images[image],
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  /*   const useWallpaper = (imageKey: string) => {
    try {
      const imageAsset = images[imageKey];
      if (!imageAsset) {
        throw new Error(`Image not found for key: ${imageKey}`);
      }

      const asset = Asset.fromModule(imageAsset);
      if (!asset) {
        throw new Error(`Failed to load asset for key: ${imageKey}`);
      }

      const imageUri = RNImage.resolveAssetSource(asset).uri;
      if (!imageUri) {
        throw new Error(`Failed to resolve URI for image: ${imageKey}`);
      }

      if (Platform.OS === "android" || Platform.OS === "ios") {
        NativeModules.WallpaperModule.setWallpaper(imageUri);
      } else {
        // Handle other platforms accordingly
        throw new Error(`Unsupported platform: ${Platform.OS}`);
      }
    } catch (error) {
      console.error("Failed to set wallpaper", error);
      // Handle or log the error as needed
    }
  };
 */

  const handleFavoriteToggle = (category: {
    id: number;
    images: string[];
    category: string;
    image: string;
  }) => {
    if (isFavorite(category)) {
      removeFromFavorites(category);
      Alert.alert("Success", "Removed from favourites");
    } else {
      addToFavorites(category);
      Alert.alert("Success", "Added to favourites");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BlurView
          tint={blurTint}
          intensity={100}
          style={{
            borderRadius: 50,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            height: 50,
            width: 50,
            zIndex: 10,
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../assets/images/icons/icons8-sort-left-100.png")}
              style={{
                width: 30,
                height: 30,
                tintColor: "white",
              }}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        style={{ backgroundColor: themedBgColor }}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Image source={selectedImage} style={styles.wallpaperImage} />
        </Animated.View>
      </Animated.ScrollView>
      <View style={styles.buttonsContainer}>
        <BlurView
          tint={blurTint}
          intensity={100}
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 100,
            overflow: "hidden",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleFavoriteToggle(category)}
          >
            <LinearGradient
              colors={["#FE6292", "#E57373"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}
            >
              <Image
                source={require("../assets/images/icons/icons8-favorite-100.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Like
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              handleSaveImage(key);
            }}
            disabled={saving}
          >
            <LinearGradient
              colors={["#FE6292", "#E57373"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}
            >
              {saving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Image
                  source={require("../assets/images/icons/icons8-downloading-updates-100.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "white",
                  }}
                />
              )}
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Save
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleSetWallpaper(key)}
          >
            <LinearGradient
              colors={["#FE6292", "#E57373"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}
            >
              <Image
                source={require("../assets/images/icons/icons8-wallpaper-100.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Set as
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleShare(selectedImage)}
          >
            <LinearGradient
              colors={["#FE6292", "#E57373"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.optionButton}
            >
              <Image
                source={require("../assets/images/icons/icons8-share-100.png")}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                }}
              />
            </LinearGradient>
            <ThemedText style={[styles.optionText, { color: "white" }]}>
              Share
            </ThemedText>
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginTop: 30,
    marginLeft: 20,
    position: "absolute",
    zIndex: 10,
  },
  blurContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  goBackButton: {
    top: 10,
    width: 45,
    height: 45,
    tintColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  header: {
    height: windowHeight,
    overflow: "hidden",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  backButton: {
    borderRadius: 50,
    width: 70,
    height: 70,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
  },
  optionButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "beiruti",
    fontWeight: "800",
    marginHorizontal: -20,
  },
});

export default BookDetailScreen;
