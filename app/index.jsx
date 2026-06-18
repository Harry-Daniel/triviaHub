import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import QuizSetup from "../components/quizSetup";
import { useState } from "react";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  const [categoryID, setCategoryID] = useState(1);
  const category = [
    {
      id: 1,
      title: "All Categories",
      icon: <FontAwesome6 name="ellipsis" size={24} color="white" />,
    },
    {
      id: 2,
      title: "General Knowledge",
      icon: <FontAwesome5 name="brain" size={24} color="white" />,
    },
  ];
  return (
    <View
      className="items-center bg-[#0F084B] relative p-4 gap-y-4"
      style={{ width: width, height: height }}
    >
      <View className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"></View>
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-bold top-20">
        QUIZ HUB
      </Text>
      <View className="z-10 shadow-md">
        <QuizSetup />
      </View>
      <Text className="text-[#A6CFD5]">Select a Category</Text>
      <View>
        <FlatList
          data={category}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCategoryID(item.id)}
              className={`w-96 h-20  ${item.id === categoryID ? "bg-[#A6CFD5] shadow-blue-50" : "bg-[#637081]"} mt-4 rounded-md items-center  flex flex-row gap-x-8 px-8 py-4 relative shadow-md `}
            >
              {item.icon}
              <Text className="text-white text-2xl">{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
