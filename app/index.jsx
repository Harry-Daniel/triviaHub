import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TriviaSetup from "../components/triviaSetup";
import CategorySelect from "../components/categorySelect";
import getQuestions from "../utilities/getQuestions";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  const [categoryID, setCategoryID] = useState("any");
  const [numQuestions, setNumQuestions] = useState(10);

  return (
    <View
      className="items-center bg-[#0F084B] relative p-4 gap-y-4"
      style={{ width: width, height: height }}
    >
      <View
        pointerEvents="none"
        className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"
      />
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-bold top-20">
        TRIVIA HUB
      </Text>
      <View className="z-10 shadow-md">
        <TriviaSetup
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
        />
      </View>
      <Text className="text-[#A6CFD5]">Select a Category</Text>
      <CategorySelect categoryID={categoryID} setCategoryID={setCategoryID} />
      <TouchableOpacity
        onPress={async () => {
          const questions = await getQuestions(numQuestions, categoryID);
          console.log(questions);
        }}
        className="bg-[#A6CFD5] px-8 py-4 rounded-md mt-4"
      >
        <Text className="text-[#0F084B] font-bold"> Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
