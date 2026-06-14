import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View
      className="justify-center items-center bg-[#0F084B] relative"
      style={{ width: width, height: height }}
    >
      <View className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-96"></View>
      <View>
        <Text className="text-[#C2E7D9] text-2xl">
          Welcome to the Quiz Hub!
        </Text>
        <TextInput placeholder="How many questions?"/>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
