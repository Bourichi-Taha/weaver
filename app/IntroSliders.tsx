import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../utils/index";
import metaData from "../db.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomImages = () => {
  const shuffledCarousel = shuffleArray([...metaData.carousel]);
  return shuffledCarousel.slice(0, 3).map((imageKey) => images[imageKey]);
};

/* const slides = [
  {
    key: "one",
    title: "Explore Diverse Categories",
    text: "Browse through a wide range of categories \n tailored to your style.",
    image: images[metaData.carousel[0]],
  },
  {
    key: "two",
    title: "High-Quality Images",
    text: "Enjoy high-definition wallpapers designed \nto enhance your screen.",
    image: images[metaData.carousel[1]],
  },
  {
    key: "three",
    title: "Get Started",
    text: "Enjoy high-definition wallpapers designed \nto enhance your screen.",
    image: images[metaData.carousel[2]],
  },
];
 */

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SlidersScreen = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const randomImages = getRandomImages();
    const newSlides = [
      {
        key: "one",
        title: "Discover Stunning Wallpapers",
        text: "Browse a diverse collection of  \nhigh-quality images to personalize your device.",
        image: randomImages[0],
      },
      {
        key: "two",
        title: "Effortless Customization",
        text: "Easily preview and set new wallpapers \nwith just a few taps.",
        image: randomImages[1],
      },
      {
        key: "three",
        title: "Stay Inspired",
        text: "Enjoy fresh, curated wallpapers regularly \nto keep your screen looking vibrant and new.",
        image: randomImages[2],
      },
    ];
    setSlides(newSlides);
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.optionButton}>
        <LinearGradient
          colors={["#FE6292", "#E57373"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.optionButton}
        >
          <Image
            source={require("../assets/images/icons/icons8-arrow-100(1).png")}
            style={{
              width: 50,
              height: 50,
              tintColor: "white",
            }}
          />
        </LinearGradient>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "TabLayout" }],
          })
        }
      >
        <LinearGradient
          colors={["#FE6292", "#E57373"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.optionButton}
        >
          <Image
            source={require("../assets/images/icons/icons8-done-100.png")}
            style={{
              width: 50,
              height: 50,
              tintColor: "white",
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const _renderSkipButton = () => {
    return (
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "TabLayout" }],
          })
        }
      >
        <LinearGradient
          colors={["#FE6292", "#E57373"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.optionButton}
        >
          <Image
            source={require("../assets/images/icons/icons8-skip-100.png")}
            style={{
              width: 40,
              height: 40,
              tintColor: "white",
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const onDoneAllSlides = () => {
    setShowRealApp(true);
  };

  const onSkipSlides = () => {
    setShowRealApp(true);
  };

  if (showRealApp) {
    return navigation.navigate("TabLayout");
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        showSkipButton={true}
        onDone={onDoneAllSlides}
        onSkip={onSkipSlides}
        activeDotStyle={{ backgroundColor: "#FE6292" }}
      />
    );
  }
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: "Beiruti",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Beiruti",
    color: "gray",
    marginBottom: 100,
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.8,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgb(242, 177, 188)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    color: "white",
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
    fontSize: 18,
    color: "#666",
    marginHorizontal: -20,
    fontFamily: "Beiruti",
  },
});

export default SlidersScreen;
