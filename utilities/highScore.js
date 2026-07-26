import AsyncStorage from "@react-native-async-storage/async-storage";

const HIGH_SCORE_KEY = "triviahub:highScorePercent";

export async function getHighScore() {
  try {
    const stored = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    return stored !== null ? Number(stored) : 0;
  } catch (error) {
    console.error("Failed to read high score:", error);
    return 0;
  }
}

export async function recordScore(score, total) {
  if (!total) return getHighScore();

  const percent = Math.round((score / total) * 100);
  const currentBest = await getHighScore();

  if (percent <= currentBest) return currentBest;

  try {
    await AsyncStorage.setItem(HIGH_SCORE_KEY, String(percent));
  } catch (error) {
    console.error("Failed to save high score:", error);
    return currentBest;
  }
  return percent;
}
