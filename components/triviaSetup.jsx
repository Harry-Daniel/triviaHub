import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";

const DIFFICULTY_LABELS = {
  any: "Overall",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const TriviaSetup = ({
  numQuestions,
  setNumQuestions,
  difficulty = "any",
  highScore,
  scoreHistory = [],
}) => {
  const [showQuestionOptions, setShowQuestionOptions] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const difficultyLabel = DIFFICULTY_LABELS[difficulty] ?? "Overall";

  return (
    <View>
      <View className="w-96 h-20 bg-[#A6CFD5] mt-28 rounded-md justify-center flex flex-row gap-x-12 p-4 relative shadow-2xl shadow-blue-50">
        <TouchableOpacity
          onPress={() => setShowQuestionOptions(!showQuestionOptions)}
          className="justify-center items-center"
        >
          <Text className="font-mono text-xs text-[#0F084B]">Number of Questions</Text>
          <Text className="text-3xl font-display text-[#0F084B]">
            {numQuestions}
          </Text>
          <Text className="font-mono text-xs text-[#0F084B]">Tap to change</Text>
        </TouchableOpacity>
        {showQuestionOptions && (
          <View className="absolute -bottom-[110px] left-6 rounded-md w-48 bg-[#A6CFD5] px-4 justify-center items-center border border-[#0F084B]">
            <TouchableOpacity
              onPress={() => {
                setNumQuestions(10);
                setShowQuestionOptions(false);
              }}
              className="border-b border-b-[#0F084B70] w-full justify-center items-center"
            >
              <Text className="text-base font-display py-2">10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNumQuestions(15);
                setShowQuestionOptions(false);
              }}
              className="border-b border-b-[#0F084B70] w-full justify-center items-center"
            >
              <Text className="text-base font-display py-2">15</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNumQuestions(20);
                setShowQuestionOptions(false);
              }}
            >
              <Text className="text-base font-display py-2 w-full">20</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="  border-l border-l-[#0F084B] "></View>
        <TouchableOpacity
          onPress={() => setShowHistory(true)}
          className="justify-center items-center"
        >
          <Text className="font-mono text-xs text-[#0F084B]">{difficultyLabel} High Score</Text>
          <Text className="text-3xl font-display text-[#0F084B]">{highScore}%</Text>
          <Text className="font-mono text-xs text-[#0F084B]">Tap for history</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={showHistory} animationType="fade" onRequestClose={() => setShowHistory(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowHistory(false)}
          className="flex-1 bg-black/60 justify-center items-center"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="w-80 bg-[#0F084B] rounded-md p-6 gap-y-4 border border-[#A6CFD5]/30"
          >
            <Text className="font-display text-xl text-[#A6CFD5]">
              Recent {difficultyLabel} Games
            </Text>
            {scoreHistory.length === 0 ? (
              <Text className="font-body text-white/70">No games played yet.</Text>
            ) : (
              <View className="gap-y-3">
                {scoreHistory.map((entry, index) => (
                  <View
                    key={entry.date ?? index}
                    className="flex-row justify-between items-center border-b border-b-[#A6CFD5]/20 pb-2"
                  >
                    <Text className="font-body-semibold text-white">
                      {entry.score}/{entry.total}
                    </Text>
                    <Text className="font-mono text-[#A6CFD5]">{entry.percent}%</Text>
                    <Text className="font-mono text-white/50 text-xs">
                      {new Date(entry.date).toLocaleDateString()}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            <TouchableOpacity
              onPress={() => setShowHistory(false)}
              className="bg-[#A6CFD5] rounded-md py-3 items-center mt-2"
            >
              <Text className="font-display text-[#0F084B]">Close</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TriviaSetup;
