import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInRight, useReducedMotion } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuiz } from "../../context/QuizContext";
import QuestionHub from "../../components/QuestionHub";
import AnswerOption from "../../components/AnswerOption";

const { width, height } = Dimensions.get("screen");

const Quiz = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const { questions, currentIndex, answers, status, score, selectAnswer, goNext, reset } =
    useQuiz();

  const exitToHome = () => {
    reset();
    router.replace("/");
  };

  if (status === "empty" || (status !== "complete" && questions.length === 0)) {
    return (
      <View
        className="items-center justify-center bg-[#0F084B] px-8 gap-y-4"
        style={{ width, height, paddingTop: 32 + insets.top, paddingBottom: 32 + insets.bottom }}
      >
        <Text className="text-2xl font-display text-white text-center">
          No questions for that pick.
        </Text>
        <Text className="font-body text-[#A6CFD5] text-center">
          Open Trivia DB doesn&apos;t have enough questions for this category and count. Try
          fewer questions or a different category.
        </Text>
        <TouchableOpacity onPress={exitToHome} className="bg-[#A6CFD5] px-8 py-4 rounded-md mt-4">
          <Text className="text-[#0F084B] font-display">Back home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (status === "complete") {
    return (
      <View
        className="items-center justify-center bg-[#0F084B] px-8 gap-y-6"
        style={{ width, height, paddingTop: 32 + insets.top, paddingBottom: 32 + insets.bottom }}
      >
        <Text className="font-mono text-[#A6CFD5] uppercase tracking-widest text-xs">
          Quiz complete
        </Text>
        <Text className="text-white text-6xl font-display">
          {score}
          <Text className="text-2xl font-mono text-[#A6CFD5]"> / {questions.length}</Text>
        </Text>
        <Text className="font-body text-white text-center text-base px-4">
          {score === questions.length
            ? "Every question, right."
            : `You knew ${score} of ${questions.length}.`}
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="bg-[#A6CFD5] px-10 py-4 rounded-md w-64 items-center mt-4"
        >
          <Text className="text-[#0F084B] font-display">Back home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[currentIndex];
  const revealed = answers[currentIndex] !== undefined;
  const results = questions.map((q, i) =>
    answers[i] === undefined ? undefined : q.options[answers[i]].isCorrect,
  );
  const isLast = currentIndex === questions.length - 1;

  const QuestionCard = reducedMotion ? View : Animated.View;
  const cardAnimationProps = reducedMotion ? {} : { entering: FadeInRight.duration(220) };

  return (
    <View
      className="bg-[#0F084B] px-4 gap-y-6"
      style={{ width, height, paddingTop: 16 + insets.top, paddingBottom: 16 + insets.bottom }}
    >
      <View className="flex-row items-center justify-between mt-2">
        <TouchableOpacity onPress={exitToHome} hitSlop={12}>
          <AntDesign name="close" size={22} color="#A6CFD5" />
        </TouchableOpacity>
        <Text className="font-mono text-[#A6CFD5] text-xs">
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>

      <QuestionHub total={questions.length} currentIndex={currentIndex} results={results} />

      <QuestionCard key={currentIndex} {...cardAnimationProps}>
        <View className="gap-y-6 mt-4">
          <View className="gap-y-2">
            <Text className="font-mono text-[#A6CFD5] text-xs uppercase tracking-widest">
              {question.category} · {question.difficulty}
            </Text>
            <Text className="text-white text-2xl font-display leading-8">
              {question.question}
            </Text>
          </View>

          <View className="gap-y-3">
            {question.options.map((option, index) => (
              <AnswerOption
                key={option.text + index}
                text={option.text}
                isCorrectAnswer={option.isCorrect}
                isSelected={answers[currentIndex] === index}
                revealed={revealed}
                onPress={() => !revealed && selectAnswer(index)}
              />
            ))}
          </View>
        </View>
      </QuestionCard>

      {revealed && (
        <TouchableOpacity
          onPress={goNext}
          className="bg-[#A6CFD5] px-8 py-4 rounded-md mt-auto items-center"
        >
          <Text className="text-[#0F084B] font-display">
            {isLast ? "See results" : "Next question"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Quiz;
