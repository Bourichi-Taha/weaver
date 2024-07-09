import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Text,
  TextInput,
  Share,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
SCROLLABLE_DECELERATION_RATE_MAPPER;
import React, { useRef, useCallback, useMemo, useState } from "react";
import Rate, { IConfig, AndroidMarket } from "react-native-rate";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  SCROLLABLE_DECELERATION_RATE_MAPPER,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import WebView from "react-native-webview";
import Constants from "expo-constants";

export default function HomeScreen() {
  const rateModalRef = useRef<BottomSheetModal>(null);
  const contactModalRef = useRef<BottomSheetModal>(null);
  const aboutModalRef = useRef<BottomSheetModal>(null);
  const termsModalRef = useRef<BottomSheetModal>(null);
  const privacyModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "43%"], []);
  const snapPointsSecond = useMemo(() => ["18%", "55%"], []);
  const snapPointsThird = useMemo(() => ["50%", "90%"], []);
  const snapPointsFourth = useMemo(() => ["50%", "90%"], []);
  const snapPointsFifth = useMemo(() => ["50%", "90%"], []);

  const colorScheme = useColorScheme();
  const color = colorScheme === "dark" ? "white" : "black";
  const themedSheetColor = colorScheme === "dark" ? "#232323" : "white";
  const themedHandleStyle = colorScheme === "dark" ? "#474747" : "#404040";
  const themedCursorStyle = colorScheme === "dark" ? "#474747" : "#404040";

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleRateStart = useCallback(() => {
    rateModalRef.current?.present();
  }, []);

  const handleContactStart = useCallback(() => {
    contactModalRef.current?.present();
  }, []);

  const handleAboutStart = useCallback(() => {
    aboutModalRef.current?.present();
  }, []);

  const handleTermsStart = useCallback(() => {
    termsModalRef.current?.present();
  }, []);

  const handlePrivacyStart = useCallback(() => {
    privacyModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handlePress = () => {
    const url = "https://mobtwin.com/";
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const shareApp = () => {
    const storeUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/instagram/id389801252"
        : "market://details?id=com.instagram.android";

    const message = `${storeUrl}`;

    Share.share({
      message: message,
    })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleFeedbackPress = async () => {
    const storeUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/instagram/id389801252"
        : "market://details?id=com.instagram.android";

    try {
      await Linking.openURL(storeUrl);
    } catch (error) {
      console.error("Failed to open store:", error);
    }
  };

  const handleRatePress = () => {
    const options = {
      GooglePackageName: "com.instagram.android",
      AppleAppID: "389801252",
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: "https://instagram.com",
    };

    Rate.rate(options, (success, error) => {
      if (success) {
        console.log("Rating submitted");
      } else {
        console.error("Failed to open store:", error);
      }
    });
  };

  const handleSubmit = () => {
    const email = "mobtwinteam@info.com";
    const subject = "Feedback or Review Submission";
    const body = "Here is my feedback/review...";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink);
  };

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} />,
    []
  );

  return (
    <GestureHandlerRootView>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#fff", dark: "#222222" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.profileImageSection}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=1000&id=YRJN4lBDhzh8&format=png&color=000000",
              }}
              style={{
                width: 60,
                height: 60,
                opacity: 0.15,
                tintColor: color,
              }}
            />
          </ThemedView>
          <TouchableOpacity
            onPress={() => console.log("Sign in button pressed")}
          >
            <ThemedView style={styles.googleButton}>
              <BlurView intensity={50} style={styles.blurContainer}>
                <LinearGradient
                  colors={["#FE6292", "#E57373"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.googleButtonGradient}
                >
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=GCr1YMMngliP&format=png&color=ffffff",
                    }}
                    style={styles.googleIcon}
                  />
                  <ThemedText style={styles.googleButtonText}>
                    Sign in with Google
                  </ThemedText>
                </LinearGradient>
              </BlurView>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Support us</ThemedText>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handleRateStart}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=WJRf67QgKO2k&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Rate Us
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handleContactStart}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=QqtDTGEho4jP&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Contact Us
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={shareApp}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=JanHgvvWv0rK&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Share with Friends
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handleAboutStart}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=GmcSXvmvXrd7&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              About us
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handleTermsStart}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=eShmRfVzlvgL&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Terms of Use
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handlePrivacyStart}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=r2Vh0YFzweoF&format=png&color=000000",
              }}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Privacy Policy
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.sectionCopyright}>
            <ThemedText style={[styles.sectionCopyrightText, { color: color }]}>
              Generated by Mobtwin
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.sectionCopyrightContent}>
            <TouchableOpacity
              style={styles.copyrightContent}
              onPress={handlePress}
            >
              <Image
                source={{
                  uri: "data:image/webp;base64,UklGRmYNAABXRUJQVlA4WAoAAAAQAAAA6wAA6wAAQUxQSCMLAAAB8MD//+m2//89zklSrk67vmpjtovZVmfb3l6dbdu2bbN7YUax2mbSNMnzjfWck0efOX35FRETAP/6/1///+FTWrFKcMfevdo3cjdnsbFWvgGduvcKKbXP/4d8vzdVQ3p1alrVTkoD34Grjj768C02NuL1pe2hrc0xuYXM3X/nbXRMrD789v7+kTWDvMqYdceN9yKzi8n3Nfmpb46P90cia7X86tc0BdGjypyo2yvaWpSdCp12v1ET3skXR/sikNVfFqYkeljx85ZWxmXEc85HImzWiXbmunIcfo/o7ddTPcqCtNpRInz4KEudSLw3ZhI9rj5SW4ZOUv8h0WXGXFMdsNUuED3/NECKjKkVptKJNm2pRLja15T6ThUWLMFV47Ga6Dj+R8F8TyiJ3teE1UfldpzoPronI4zNxgIiBi94I7KYVYyAvK7JCsFOSiOiULvQGk+HzwTlJgchar4lIjGqJ4PFfA/BmdqJ5We0IVcskMM/YBkQhYRstOclrf+ViMaIvkgkO9RYotvxMpubKx5K9hrjqPeSYNXO5+X5Wi0eyMt6OMYnoiGXfHhI2xUTEZk0hcVguVeBJ7wXD/kCIiZVx+QYKj8neHOm8vC9LirI0+oYGn5FpFrBcKv7VVz82hxD60hEZI8ZtyZx4iKyH4a+MZhO2HFrlSIuEidjGBWP6Zwjt07p4iIlFMNoVGcduHXNEF/9YzGdc+TWJlVcJE3F0DYK01V3bk3ixcW3wRjqf8F0149b3Qhx8bYlhsrPMT2rxa3SbXHxrAYG64MKRGFNuFVcLirUZ+wwsNOTEb1rz03WtURMpM2RYICAnxHFjOQGfm/UIuJNMKA0O6jBk7eG4WaxtFA8qA/b4ID+sXi0F00ZTtJGEVrRED0AkMr3a9GQN67cwHhrrljQHnXGwvSMxhPTTcKNafhBLMT0Z7GA5VI8uVtYbmA4J1MkLLcCvJUuodH85MQDHHarRcG1KoCYCfgVC8kKMeQB1S6LgZ+DWEwAHX/FojrmxAcCHqr03k/tAHuHMCUOTUJrlg/Uu12o35RhbQF/g6s4CFnnwAv8jxbqtSsNoAzKfFdl4YhtxU9iP+Wr/kpd7C0rCwD23U9kYtDuduIFYNlkY4J+Sj3c0RbKrN+Afa8ydUbSxrD8ABx6bn6crNYzGc+39/WGMu3Qctqeq68/RsUmJKWkZeapBCEvmgoBYBkwfv2ZJ+8jY2JiY+MS07IL1Dgy46NjYmJiscdEvH9xYceUprZQ9it4BXcbOmbi1Jmhi9YeuP02Mj6zhA856yYIAMgc6nYeNHLU6NFjp4Qu33z86dfo1CIdJV9ZOGH4yFGjRiMfM2pA50YuxkBdQ+c6bQYvv/01Q6HmlLfJVCCejLl3QM/Zp35OLizRCqX5MsUGRCXDSiQy2+pDD71RcdGmzjZGAAzDSmQWnm1XPMsWKq63lBEX32dN7WuNPlxQGtEmTjFAUKqhtXfvPYmCqGdYgmit4NFlb2ophMTPs0YDAIZurVdG8it56Qei1nXIxdxSSNrGyogAwKbTgWQ+RZssxQ2A3/w3mu8R7elgQ0wA9pNfq7nlTzEXOwBtr+V9j5C3gx1kmAAaX8jilDfOTPyAy678UojqaHMLCSaw25Su5VCw2EoEsdbLikohqoQ9TRhMjNnCDA6KoxVFEIDtvPxSCMn/tKOdBR4Am9DM0rRJTUUR2C9RlUZI4ftzk1o582OEArtlhaUQcrGSUIy4AMftxRwIIcmvj8wOCfSUmzAcdOi0g0PJsVa2wuhZS1f/WoGtWzSq7utkKhC4Xi3hRAhRxT8/tHLW8M6BdapWruTv6+lsLRUK/G6VRsjbNUPaN2/RsmWr77du3aZlYC1/F3O9wVp4tJq5+8rLj5ER7x6d3zqinmMFVggIeqvh8X1VyqeX929eu3Lh2LbQbjV/MGUEYYJitaURooj+HB4RERlV6rfIj88v75gY4GbO6gHWoPKMR1mEa0nkuZGVjBgBYHaKINzzIk4O8ZAyAoDZwmwuQifcmVrZgKFe1aVv8lVaTkSjzHk2raIQtpd1RjTKrCfT3IVgvV7pTqvK+3WBF+VMJ4ZlECHVKVc7CwDDY3VGCFEnPx5vyg/Y6ak6+//0+4MMaFZpaxwR/N00K352RzAQQuK2VuEHTg9QEBK+0ZNe9U5riQ5TV7jxgoHpOIj2fGN+sCAHB9Ecr0mr2jeIbtXbPXn5nkJCyKPG/Bo9RULI+RpUYryuEp2vdeJjMFqNhTyvLOVjvl2DhZxyo5Hl4QLdFU804QGNotAU3/LhA6PT0RTvMKKP8YR0gjC+Cx/Pk2hI/iY5nxZhaEj0SPrU/0JQnq/Ew3QUHpLZU8bD/RAezXN/ljL2mwnO3FAeEJCjRUPuVOFhsgAPKVhhThemUxIS8tCfh/erEjzqqcbcYFguHm1UIylVbNYTrGlzGG7y3YV4yO3aPFp9xEPIEjlVAp+jIbetGE7mM3MQpY9muFW7gUj7sjpVJmjwhAdIOJkOzUKk3W7BzecYIqLpRRODTQRv+o8yTkadUhCRu7W5uezARBZaUaTSNUSKU4acZIFRmML7cbNbieqsP0U6vUWkeWrLSVLjV0xpM7iZz0T1Lpgiw+MRkQ9VWS6M9xMNovzl3IxGazCldKTItBxMsc0MODndKkGk2spwG1aEKbsbReYqMCW04QT211SINHuNORkOytdi6kuRUFTJ7Q25XSlGRI5YcpL2zcNUMERPpXTgZnteiemEnJOkV47osjmrQGXDie2Z/buG/JwS00k5J0kvVPmDf1fJKd+csClXybn1zhZBqX/iy/mbopTfTGzF3lkFpqPWIs/yWCEizV5jkWeyJx+RciOIPOnGbES5i8QeOycFUepUscd0/orocy+xBx6PEd2qKvpku5VotOtNRB8MiEIT2wfEn9tFLZYjnuUAmJiBpGgIiLBUfj5nkZz0LRdI+8SjSOooKxeA9QI1goIZllA+ANdDuiveZgvlBfC5VKSjgmMuUH4AjzP5Osk/4gnlCXDYka+Dos2uUL5grKcmCBY9zo4tZwBYtT2ULkjc7ubmIKy4A/AavO+dkkfxrzt7u4LQYg/gh06LLoR9ScxRKItykr68vrCovR0IL/4AwCEwZMqanXt3rpoaEuwAOi0X/D8rMzQE3ZcbkP71U0p7vVQw5A8mqR2o0ScP1TCKzFViSm5PjRBU+UMoEqrAlNiaFky3TEy5fSgyLQdTbJCUEtA2EVNGV4oMjcX0sQZLi8bRmJI6UKTLO0Sa53ZAy8rvNIjeBlOk6g1EigsmlGDA/YYa0cUqFDHZiShzkQElAOxWliBaakURmFiIJzJIQg3Dzrl4lL0YmjR5hUZz0xTo6fFSjeZVNaCpfLUWS+osoKjZwiwsqrnWVIFuaVie1qCJtMEnJNqoxgxd3PYjUSyT0QQMNufhUGyzAbpKA2Nx3KkCdPV7geN9LZYyYDKjEMO3EKDtyCQM6eMZoK7tAaXusmeZU8dqZa7uCrZaAYV9LhTrqmCLPdDXc79CV8pT/kDleneKdZN90AFoXPm8QjfK6/WAzmydazrJ2yhnqMR6HFXr5GINllIgrbpNKVzcNDlQmnGenyhc1ho/CdDbddRjgdTnOlsBveXdLwl1s78jUF3aaMkLBb+8m9MqA92rzbpXxE/xZH4doH/TJTfDUxWlFSa9PT2rBtC/7oKLH5IKSytK/nxlSQDoR/c+oQcffYqIjAh/f2/n9LZy0I+OHafvvv8+PCIy4tOjfTO6O4P+ZOV+dQOCAxvW9jYDfWrhXbtxUHCTur7W8K////X/H2QBAFZQOCAcAgAAsBoAnQEq7ADsAD6RQp1KpaOioacfqBiwEgllbuFsYNPBn+MGoS/ID41JM79ExwW9BpmdP3CyLY+TsfJ2Pk7Hydj5Ox8UcB/11vhgog6te3IbLfe1QsuB3wGDqpIXMCoRZWPWuOIc10P2g8jJ7qGFq9+ujAg5SRnSs5u8ZOXk6dOLpVNWTp0CIKskyeQSgOu9Y+z0B5GBeKQeO0bq7W++WUHXClZcmOaNw6oDC8XEyEGlpUlaBEFWPwPRFMftGXsr1m2baaw/kr2zB65aI7qk1VfYv1CTPB4VCIsqWMAAAP796MAAAABB/+UQb/q+rV+d1PnMV92B9PhWEI9bpe+TOjGJSdSvL3Xe8X5lCBD1+03DCpp5P/JM0BNeiGhBgDpwJnrMtwE4ktSOAAb4srtwF/Pk5IHSnQOTcbldBd/G+5r2Rc2wU7qnwOeakSJwnH4aymlRoGZh4twhYPrr+5Yvyb/6aUg9O78wrJbyeEjzuEJZYI+xWyxl9X4ol+414545O1dmAyqKtvZFRDKPUzjLIj4fxzLZzFfdnBSlUGo1eypelnuDbhprEExWwgWiCZLO29GmQn0nPPGYU/QwNjJDeCoIJWv7ebVqvijgOCUqcPGA6RAiawLKqE1N5ePEcPpK7rqkkVl06rraxfIT3k79DKyX60ccWsF8DXusMwAd7wKeuXhLkfd/MCLPx755gm3UKl3z9wAAAAAAAAAA",
                }}
                style={styles.logoIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyrightContent}
              onPress={handlePress}
            >
              <LinearGradient
                colors={["#FE6292", "#E57373"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.generatorGradient}
              >
                <ThemedText style={styles.generatorText}>AI Builder</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={rateModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: themedSheetColor }}
          handleIndicatorStyle={{ backgroundColor: themedHandleStyle }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: themedSheetColor },
            ]}
          >
            <ThemedText style={styles.titleText}>Enjoying Mobtwin?</ThemedText>
            <ThemedText style={styles.subTitleText}>
              Help us expand and improve!
            </ThemedText>
            <ThemedText style={styles.cuteText}>
              Spread your love for the app.
            </ThemedText>
            <ThemedText style={styles.cuteText}>
              Guide others to discover it by leaving a review!
            </ThemedText>
            <ThemedView style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleFeedbackPress}
              >
                <LinearGradient
                  colors={["#FE6292", "#E57373"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.optionButton}
                >
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=c5GEXJDYBcbX&format=png&color=000000",
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      tintColor: "white",
                    }}
                  />
                  <Text style={styles.buttonText}>Send feedback</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleRatePress}
              >
                <LinearGradient
                  colors={["#FE6292", "#E57373"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.optionButton}
                >
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=WJRf67QgKO2k&format=png&color=000000",
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      tintColor: "white",
                    }}
                  />
                  <Text style={styles.buttonText}>5 Stars Rate</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ThemedView>
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
          ref={contactModalRef}
          index={1}
          snapPoints={snapPointsSecond}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: themedSheetColor }}
          handleIndicatorStyle={{ backgroundColor: themedHandleStyle }}
          keyboardBehavior="interactive"
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: themedSheetColor },
            ]}
          >
            <ThemedText style={styles.feedbackText}>
              Give your opinion
            </ThemedText>
            <BottomSheetTextInput
              style={styles.input}
              placeholder="Your Email"
              keyboardType="email-address"
              autoComplete="email"
              cursorColor={themedCursorStyle}
              onChangeText={(text) => setEmail(text)}
              inputMode="email"
            />
            <BottomSheetTextInput
              style={styles.input}
              placeholder="Subject"
              maxLength={30}
              onChangeText={(text) => setSubject(text)}
              inputMode="text"
            />
            <BottomSheetTextInput
              style={styles.bodyInput}
              placeholder="Type here..."
              multiline={true}
              onChangeText={(text) => setBody(text)}
              inputMode="text"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <LinearGradient
                colors={["#FE6292", "#E57373"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButton}
              >
                <ThemedText style={styles.submitText}>Submit</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
          ref={aboutModalRef}
          index={1}
          snapPoints={snapPointsThird}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: themedSheetColor }}
          handleIndicatorStyle={{ backgroundColor: themedHandleStyle }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: themedSheetColor },
            ]}
          >
            <ThemedText style={styles.titleText}>About Mobtwin</ThemedText>
          </BottomSheetView>
        </BottomSheetModal>

        <BottomSheetModal
          ref={termsModalRef}
          index={1}
          snapPoints={snapPointsFourth}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: themedSheetColor }}
          handleIndicatorStyle={{ backgroundColor: themedHandleStyle }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: themedSheetColor },
            ]}
          >
            <ThemedText style={styles.titleText}>
              Terms and Conditions
            </ThemedText>
          </BottomSheetView>
          <WebView source={{ uri: "https://www.google.co.uk/" }} />
        </BottomSheetModal>

        <BottomSheetModal
          ref={privacyModalRef}
          index={1}
          snapPoints={snapPointsFifth}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: themedSheetColor }}
          handleIndicatorStyle={{ backgroundColor: themedHandleStyle }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              { backgroundColor: themedSheetColor },
            ]}
          >
            <ThemedText style={styles.titleText}>Privacy Policy</ThemedText>
          </BottomSheetView>
          <WebView source={{ uri: "https://www.google.co.uk/" }} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    height: "100%",
    width: "100%",
    zIndex: 10,
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "black",
    fontFamily: "Beiruti",
    fontSize: 18,
    fontWeight: "800",
  },
  settingsIcon: {
    padding: 8,
  },
  profileSection: {
    alignItems: "center",
    padding: 16,
  },
  profileImageSection: {
    width: 100,
    height: 100,
    borderRadius: 90,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(129, 129, 129, .15)",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 22,
    height: 22,
    tintColor: "white",
  },
  googleButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Beiruti",
    marginLeft: 8,
  },
  googleButton: {
    marginTop: 0,
  },
  googleButtonGradient: {
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
  section: {
    padding: 5,
  },
  sectionTitle: {
    color: "#818181",
    fontSize: 15,
    fontFamily: "Beiruti",
    marginBottom: 15,
    fontWeight: "500",
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "rgba(129,129,129,.1)",
    borderRadius: 9,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionItemText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Beiruti",
    marginLeft: 20,
    flex: 1,
    fontWeight: "400",
  },
  sectionCopyright: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 5,
  },
  sectionCopyrightText: {
    color: "black",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Beiruti",
    flex: 1,
    fontWeight: "400",
  },
  generatorText: {
    fontSize: 12,
    fontFamily: "Beiruti",
    color: "white",
  },
  generatorGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 100,
    justifyContent: "center",
  },
  sectionCopyrightContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "center",
  },
  copyrightContent: {
    paddingHorizontal: 5,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
  logoIcon: {
    width: 35,
    height: 35,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    zIndex: 10,
  },
  titleText: {
    fontSize: 35,
    marginTop: 20,
    fontFamily: "Beiruti",
    textAlign: "center",
    padding: 10,
  },
  subTitleText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 30,
    padding: 10,
    fontFamily: "Beiruti",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "800",
  },
  cuteText: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 18,
    fontFamily: "Beiruti",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 15,
    position: "absolute",
    bottom: 120,
    alignContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 15,
  },
  optionButton: {
    backgroundColor: "transparent",
    borderRadius: 11,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Beiruti",
  },
  feedbackText: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "Beiruti",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "rgba(0,0,0,.15)",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  bodyInput: {
    width: "90%",
    height: 120,
    borderColor: "rgba(0,0,0,.15)",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 0,
    backgroundColor: "transparent",
    borderRadius: 250,
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    fontFamily: "Beiruti",
  },
});
