import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = ({ navigation }) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("IntroSliders");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          style={{
            width: windowWidth * 0.3,
            height: windowHeight * 0.3,
            resizeMode: "contain",
          }}
          source={require("../assets/images/icons/mobtwin.webp")}
        />
        <View
          style={{
            top: 190,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Beiruti",
              }}
            >
              Generated by Mobtwin
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/icons/mobtwin.webp")}
              style={{
                width: 35,
                height: 35,
              }}
            />
            <LinearGradient
              colors={["#FE6292", "#E57373"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 2,
                paddingHorizontal: 10,
                borderRadius: 100,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Beiruti",
                  color: "white",
                }}
              >
                AI Builder
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
