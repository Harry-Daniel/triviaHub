import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  const [numQuestions, setNumQuestions] = useState(15);
  const [showQuestionOptions, setShowQuestionOptions] = useState(false);

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
        <View className="w-96 h-20 bg-[#A6CFD5] mt-52 rounded-md justify-center flex flex-row gap-x-12 p-4 relative">
          <TouchableOpacity
            onPress={() => setShowQuestionOptions(!showQuestionOptions)}
            className="justify-center items-center"
          >
            <Text className="text-xs text-[#0F084B]">Number of Questions</Text>
            <Text className="text-3xl font-bold text-[#0F084B]">
              {numQuestions}
            </Text>
            <Text className="text-xs text-[#0F084B]">Tap to change</Text>
          </TouchableOpacity>
          {showQuestionOptions && (
            <View className="absolute -bottom-[110px] left-6 rounded-md w-48 bg-[#A6CFD5] px-4 justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setNumQuestions(10);
                  setShowQuestionOptions(false);
                }}
                className="border-b border-b-[#0F084B70] w-full justify-center items-center"
              >
                <Text className="text-base font-bold py-2">10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setNumQuestions(15);
                  setShowQuestionOptions(false);
                }}
                className="border-b border-b-[#0F084B70] w-full justify-center items-center"
              >
                <Text className="text-base font-bold py-2">15</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setNumQuestions(20);
                  setShowQuestionOptions(false);
                }}
              >
                <Text className="text-base font-bold py-2 w-full">20</Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="  border-l border-l-[#0F084B] "></View>
          <View className="justify-center items-center">
            <Text className="text-xs text-[#0F084B]">High Score</Text>
            <Text className="text-3xl font-bold text-[#0F084B]">50</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
