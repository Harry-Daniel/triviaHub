import { View } from "react-native";

const NODE_STYLE = {
  upcoming: { size: 8, bg: "transparent", border: "#637081", borderWidth: 1.5 },
  current: { size: 12, bg: "#0F084B", border: "#A6CFD5", borderWidth: 2 },
  correct: { size: 8, bg: "#4CAF7D", border: "#4CAF7D", borderWidth: 0 },
  incorrect: { size: 8, bg: "#E1626B", border: "#E1626B", borderWidth: 0 },
};

function HubNode({ state, label }) {
  const { size, bg, border, borderWidth } = NODE_STYLE[state];
  return (
    <View
      className="items-center justify-center"
      style={{ width: 20, height: 20 }}
      accessibilityLabel={label}
    >
      {state === "current" && (
        <View
          className="absolute rounded-full bg-[#A6CFD5]"
          style={{ width: 20, height: 20, opacity: 0.25 }}
        />
      )}
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          borderWidth,
          borderColor: border,
        }}
      />
    </View>
  );
}

// results[i]: true (correct) | false (incorrect) | undefined (not yet answered)
const QuestionHub = ({ total, currentIndex, results }) => {
  const nodeStates = Array.from({ length: total }, (_, i) => {
    if (results[i] === true) return "correct";
    if (results[i] === false) return "incorrect";
    if (i === currentIndex) return "current";
    return "upcoming";
  });

  return (
    <View className="w-full" style={{ height: 24, justifyContent: "center" }}>
      <View
        className="absolute h-[1px] bg-[#637081]"
        style={{ left: 10, right: 10, top: "50%" }}
      />
      <View className="flex-row justify-between items-center">
        {nodeStates.map((state, i) => (
          <HubNode key={i} state={state} label={`Question ${i + 1} of ${total}, ${state}`} />
        ))}
      </View>
    </View>
  );
};

export default QuestionHub;
