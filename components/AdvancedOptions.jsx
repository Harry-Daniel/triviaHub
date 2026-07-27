import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const DIFFICULTY_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const GAME_TYPE_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "multiple", label: "Multiple Choice" },
  { value: "boolean", label: "True or False" },
];

const labelFor = (options, value) => options.find((o) => o.value === value)?.label ?? "Any";

const AdvancedOptions = ({ difficulty, setDifficulty, gameType, setGameType }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="w-96">
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className="flex-row items-center justify-between py-2"
      >
        <View>
          <Text className="font-mono text-xs uppercase tracking-widest text-[#A6CFD5]">
            Advanced Options
          </Text>
          <Text className="font-body text-[11px] text-[#A6CFD5]/60 mt-0.5">
            {labelFor(DIFFICULTY_OPTIONS, difficulty)} · {labelFor(GAME_TYPE_OPTIONS, gameType)}
          </Text>
        </View>
        <AntDesign name="right" size={14} color="#A6CFD5" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setVisible(false)}
          className="flex-1 bg-black/60 justify-center items-center"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="w-80 bg-[#0F084B] rounded-md p-6 gap-y-5 border border-[#A6CFD5]/30"
          >
            <Text className="font-display text-xl text-[#A6CFD5]">Advanced Options</Text>

            <View className="gap-y-2">
              <Text className="font-mono text-[10px] uppercase tracking-widest text-[#A6CFD5]/70">
                Difficulty
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setDifficulty(option.value)}
                    className={`px-4 py-2 rounded-md ${
                      difficulty === option.value ? "bg-[#A6CFD5]" : "bg-[#637081]"
                    }`}
                  >
                    <Text
                      className={`font-body-semibold text-sm ${
                        difficulty === option.value ? "text-[#0F084B]" : "text-white"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="gap-y-2">
              <Text className="font-mono text-[10px] uppercase tracking-widest text-[#A6CFD5]/70">
                Game Type
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {GAME_TYPE_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => setGameType(option.value)}
                    className={`px-4 py-2 rounded-md ${
                      gameType === option.value ? "bg-[#A6CFD5]" : "bg-[#637081]"
                    }`}
                  >
                    <Text
                      className={`font-body-semibold text-sm ${
                        gameType === option.value ? "text-[#0F084B]" : "text-white"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              className="bg-[#A6CFD5] rounded-md py-3 items-center mt-2"
            >
              <Text className="font-display text-[#0F084B]">Done</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AdvancedOptions;
