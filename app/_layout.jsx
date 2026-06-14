import "../global.css";
import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "../components/navBar";
const RootLayout = () => {
  return (
    <View>
      <View className="flex-1">
        <Slot />
        <NavBar />
      </View>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
