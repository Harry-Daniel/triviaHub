import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TriviaSetup from "../components/triviaSetup";
import CategorySelect, { CATEGORIES } from "../components/categorySelect";
import AdvancedOptions from "../components/AdvancedOptions";
import getQuestions from "../utilities/getQuestions";
import { useQuiz } from "../context/QuizContext";
import {
  getQuizPreferences,
  setDifficultyPreference,
  setGameTypePreference,
} from "../utilities/quizPreferences";

// Note: In app.json , change the "scheme" to match your project name.
const Home = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { startQuiz, highScores, scoreHistories } = useQuiz();
  const [categoryID, setCategoryID] = useState("any");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("any");
  const [gameType, setGameType] = useState("any");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuizPreferences().then(({ difficulty, gameType }) => {
      setDifficulty(difficulty);
      setGameType(gameType);
    });
  }, []);

  const handleSetDifficulty = (value) => {
    setDifficulty(value);
    setDifficultyPreference(value);
  };

  const handleSetGameType = (value) => {
    setGameType(value);
    setGameTypePreference(value);
  };

  return (
    <View
      className="flex-1 items-center bg-[#0F084B] relative px-4 gap-y-3"
      style={{ paddingTop: 16 + insets.top, paddingBottom: 16 + insets.bottom }}
    >
      <View
        pointerEvents="none"
        className="bg-[#A6CFD5] w-[40rem] h-[40rem] rounded-full absolute -top-[400px] m-auto"
      />
      <Text className="absolute p-4 text-[#0F084B] text-2xl font-display top-16">
        TRIVIA HUB
      </Text>
      <View className="z-10 shadow-md mt-40">
        <TriviaSetup
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          difficulty={difficulty}
          highScore={highScores[difficulty]}
          scoreHistory={scoreHistories[difficulty]}
        />
      </View>
      <AdvancedOptions
        difficulty={difficulty}
        setDifficulty={handleSetDifficulty}
        gameType={gameType}
        setGameType={handleSetGameType}
      />
      <Text className="font-mono text-[#A6CFD5] text-xs uppercase tracking-widest mt-6">
        Select a category ({CATEGORIES.length - 1})
      </Text>
      <View className="flex-1 w-full items-center">
        <CategorySelect categoryID={categoryID} setCategoryID={setCategoryID} />
      </View>
      <TouchableOpacity
        onPress={async () => {
          if (isLoading) return;
          setIsLoading(true);
          try {
            const data = await getQuestions(
              numQuestions,
              categoryID,
              difficulty,
              gameType,
            );
            startQuiz(data?.results ?? [], difficulty);
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
        Questions provided by Open Trivia Database (opentdb.com), licensed under
        CC BY-SA 4.0
      </Text>
    </View>
  );
};

export default Home;
