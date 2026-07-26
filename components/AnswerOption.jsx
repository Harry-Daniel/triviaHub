import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

const PRESS_DEPTH = 4;

const AnswerOption = ({ text, isCorrectAnswer, isSelected, revealed, onPress }) => {
  const reducedMotion = useReducedMotion();
  const pressDepth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressDepth.value }],
  }));

  const handlePressIn = () => {
    if (revealed || reducedMotion) return;
    pressDepth.value = withTiming(PRESS_DEPTH, { duration: 60 });
  };

  const handlePressOut = () => {
    if (reducedMotion) return;
    pressDepth.value = withTiming(0, { duration: 140 });
  };

  let face = "bg-[#637081]";
  let edge = "border-b-[#4A5568]";
  let textColor = "text-white";
  let icon = null;

  if (revealed) {
    if (isCorrectAnswer) {
      face = "bg-[#4CAF7D]";
      edge = "border-b-[#3B8861]";
      textColor = "text-[#0F084B]";
      icon = <AntDesign name="check" size={18} color="#0F084B" />;
    } else if (isSelected) {
      face = "bg-[#E1626B]";
      edge = "border-b-[#B8404A]";
      textColor = "text-white";
      icon = <AntDesign name="close" size={18} color="white" />;
    } else {
      face = "bg-[#637081]/30";
      edge = "border-b-transparent";
      textColor = "text-white/50";
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={revealed}
      activeOpacity={0.85}
      className="w-full"
    >
      <Animated.View style={animatedStyle}>
        <View
          className={`w-full rounded-md px-5 py-4 flex-row items-center justify-between border-b-4 ${face} ${edge}`}
        >
          <Text className={`font-body-semibold text-base flex-1 pr-3 ${textColor}`}>{text}</Text>
          {icon}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnswerOption;
