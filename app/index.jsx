import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import TriviaSetup from "../components/triviaSetup";
import CategorySelect from "../components/categorySelect";
import getQuestions from "../utilities/getQuestions";
import { useQuiz } from "../context/QuizContext";

const { width, height } = Dimensions.get("screen");

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  const router = useRouter();
  const { startQuiz, highScore } = useQuiz();
  const [categoryID, setCategoryID] = useState("any");
  const [numQuestions, setNumQuestions] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      className="items-center bg-[#0F084B] relative p-4 gap-y-4"
      style={{ width: width, height: height }}
    >
      <View
        pointerEvents="none"
        className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"
      />
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-display top-20">
        TRIVIA HUB
      </Text>
      <View className="z-10 shadow-md">
        <TriviaSetup
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          highScore={highScore}
        />
      </View>
      <Text className="font-mono text-[#A6CFD5] text-xs uppercase tracking-widest">
        Select a category
      </Text>
      <CategorySelect categoryID={categoryID} setCategoryID={setCategoryID} />
      <TouchableOpacity
        onPress={async () => {
          if (isLoading) return;
          setIsLoading(true);
          try {
            const data = await getQuestions(numQuestions, categoryID);
            startQuiz(data?.results ?? []);
            router.push("/quiz");
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
        className={`bg-[#A6CFD5] px-8 py-4 rounded-md mt-4 flex-row items-center gap-x-2 ${isLoading ? "opacity-60" : ""}`}
      >
        {isLoading && <ActivityIndicator color="#0F084B" size="small" />}
        <Text className="text-[#0F084B] font-display">
          {isLoading ? "" : " Start Quiz"}
        </Text>
      </TouchableOpacity>
      <Text className="font-mono text-[#A6CFD5]/50 text-[10px] text-center">
        Questions provided by Open Trivia Database (opentdb.com), licensed under CC BY-SA 4.0
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
