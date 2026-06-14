import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View
      className="items-center bg-[#0F084B] relative p-4"
      style={{ width: width, height: height }}
    >
      <View className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"></View>
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-bold top-20">
        QUIZ HUB
      </Text>
      <View>
        <View className="w-96 h-20 bg-blue-50 mt-52 rounded-md">
          <Text>Hello</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
