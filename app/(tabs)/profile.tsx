import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  Share,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import Rate from "react-native-rate";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "../../node_modules/@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import WebView from "react-native-webview";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

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

  const [userInfo, setUserInfo] = useState<{ picture?: string } | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const getRedirectUri = () => {
    if (Constants.platform && Constants.platform.ios) {
      return "exp://192.168.11.108:8081";
    } else if (Constants.platform && Constants.platform.android) {
      const path = "exp://192.168.11.108:8081";
      return Linking.createURL(path);
    } else {
      return "http://localhost:8081/profile";
    }
  };

  const redirectUri = getRedirectUri();

  const [fromEmail, setFromEmail] = useState("");
  const [toEmail, setToEmail] = useState("mobtwin@info.com");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "146135389195-jdm7rqvl81ls8va9hb0jippsdghpoiog.apps.googleusercontent.com",
    androidClientId:
      "146135389195-as37vq11murmf986p54t8er3kh3hpfv4.apps.googleusercontent.com",
    webClientId:
      "146135389195-qtphvosnanndgi3ukn8n9haslpbd4d9t.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    redirectUri,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (response?.type === "success") {
        try {
          const authentication = response.authentication;
          if (!authentication) {
            throw new Error("Authentication object not found");
          }
          const accessToken = authentication.accessToken;
          const user = await getUserInfo(accessToken);
          setUserInfo(user);
          setIsSignedIn(true);
          await AsyncStorage.setItem("@user", JSON.stringify(user));
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [response]);

  const getUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUserInfo(null);
      setIsSignedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
    setToEmail("mobtwin@info.com");
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject || "No Subject"
    )}&body=${encodeURIComponent(body || "No Body")}`;

    Linking.openURL(mailtoLink);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} />
    ),
    []
  );

  const renderGoogleIcon = () => {
    if (userInfo && userInfo.picture) {
      return (
        <Image
          source={{ uri: userInfo.picture }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
      );
    } else {
      return (
        <Image
          source={require("../../assets/images/icons/icons8-male-user-100.png")}
          style={{
            width: 90,
            height: 90,
            opacity: 0.15,
            tintColor: color,
          }}
        />
      );
    }
  };

  const renderGoogleButton = () => {
    if (isSignedIn) {
      return (
        <TouchableOpacity onPress={handleSignOut}>
          <ThemedView style={styles.googleButton}>
            <BlurView intensity={50} style={styles.blurContainer}>
              <LinearGradient
                colors={["#FE6292", "#E57373"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.googleButtonGradient}
              >
                <Image
                  source={require("../../assets/images/icons/icons8-google-100.png")}
                  style={styles.googleIcon}
                />
                <ThemedText style={styles.googleButtonText}>
                  Sign Out
                </ThemedText>
              </LinearGradient>
            </BlurView>
          </ThemedView>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
          <ThemedView style={styles.googleButton}>
            <BlurView intensity={50} style={styles.blurContainer}>
              <LinearGradient
                colors={["#FE6292", "#E57373"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.googleButtonGradient}
              >
                <Image
                  source={require("../../assets/images/icons/icons8-google-100.png")}
                  style={styles.googleIcon}
                />
                <ThemedText style={styles.googleButtonText}>
                  Sign in with Google
                </ThemedText>
              </LinearGradient>
            </BlurView>
          </ThemedView>
        </TouchableOpacity>
      );
    }
  };

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
            {renderGoogleIcon()}
          </ThemedView>
          {renderGoogleButton()}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Support us</ThemedText>
          <TouchableOpacity
            style={styles.sectionItem}
            onPress={handleRateStart}
          >
            <Image
              source={require("../../assets/images/icons/icons8-star-100.png")}
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
              source={require("../../assets/images/icons/icons8-mail-100.png")}
              style={[styles.iconImage, { tintColor: color }]}
            />
            <ThemedText style={[styles.sectionItemText, { color: color }]}>
              Contact Us
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={shareApp}>
            <Image
              source={require("../../assets/images/icons/icons8-share-100.png")}
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
              source={require("../../assets/images/icons/icons8-info-100.png")}
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
              source={require("../../assets/images/icons/icons8-protect-100.png")}
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
              source={require("../../assets/images/icons/icons8-security-lock-100.png")}
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
                source={require("../../assets/images/icons/mobtwin.webp")}
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
                    source={require("../../assets/images/icons/icons8-comments-100.png")}
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
                    source={require("../../assets/images/icons/icons8-star-100.png")}
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
              onChangeText={(text) => setFromEmail(text)}
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
              styles.webViewContainer,
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
              styles.webViewContainer,
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
    alignItems: "center",
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
