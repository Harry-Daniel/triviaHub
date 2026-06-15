import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const QuizSetup = () => {
  const [numQuestions, setNumQuestions] = useState(15);
  const [showQuestionOptions, setShowQuestionOptions] = useState(false);
  return (
    <View>
      <View className="w-96 h-20 bg-[#A6CFD5] mt-52 rounded-md justify-center flex flex-row gap-x-12 p-4 relative shadow-md">
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
  );
};

export default QuizSetup;
