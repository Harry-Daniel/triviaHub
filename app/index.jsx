import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import QuizSetup from "../components/quizSetup";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  return (
    <View
      className="items-center bg-[#0F084B] relative p-4 gap-y-4"
      style={{ width: width, height: height }}
    >
      <View className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"></View>
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-bold top-20">
        QUIZ HUB
      </Text>

      <QuizSetup />
      <Text className="text-[#A6CFD5]">Select a Category</Text>
      <View>
        <View className="w-96 h-20 bg-[#637081] mt-4 rounded-md items-center justify-center flex flex-row gap-x-8 p-4 relative shadow-2xl shadow-white">
          <FontAwesome6 name="ellipsis" size={24} color="#A6CFD5" />
          <Text className="text-white text-2xl">General Knowledge</Text>
        </View>
        <View className="w-96 h-20 bg-[#637081] mt-4 rounded-md items-center justify-center flex flex-row gap-x-8 p-4 relative shadow-md">
          <FontAwesome5 name="brain" size={24} color="#A6CFD5" />
          <Text className="text-white text-2xl">General Knowledge</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
