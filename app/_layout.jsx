import "../global.css";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SpaceGrotesk_700Bold } from "@expo-google-fonts/space-grotesk";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { IBMPlexMono_500Medium } from "@expo-google-fonts/ibm-plex-mono";
import NavBar from "../components/navBar";
import { QuizProvider } from "../context/QuizContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    IBMPlexMono_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QuizProvider>
        <View>
          <View className="flex-1">
            <Slot />
            {/* <NavBar /> */}
          </View>
        </View>
      </QuizProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
