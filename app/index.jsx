import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View
      className="justify-center items-center"
      style={{ width: width, height: height }}
    >
      <View>
        <Text className="text-gray-500">Welcome to the Home Page!</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
