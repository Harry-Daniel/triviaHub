import AsyncStorage from "@react-native-async-storage/async-storage";

const DIFFICULTIES = ["any", "easy", "medium", "hard"];
const HIGH_SCORE_KEY = "triviahub:highScoresByDifficulty";
const HISTORY_KEY = "triviahub:scoreHistoryByDifficulty";
const HISTORY_LIMIT = 5;

const emptyScores = () => Object.fromEntries(DIFFICULTIES.map((d) => [d, 0]));
const emptyHistories = () => Object.fromEntries(DIFFICULTIES.map((d) => [d, []]));

export async function getHighScores() {
  try {
    const stored = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    return stored ? { ...emptyScores(), ...JSON.parse(stored) } : emptyScores();
  } catch (error) {
    console.error("Failed to read high scores:", error);
    return emptyScores();
  }
}

export async function recordScore(score, total, difficulty = "any") {
  const scores = await getHighScores();
  if (!total) return scores;

  const percent = Math.round((score / total) * 100);
  if (percent <= scores[difficulty]) return scores;

  const next = { ...scores, [difficulty]: percent };
  try {
    await AsyncStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Failed to save high score:", error);
    return scores;
  }
  return next;
}

export async function getScoreHistories() {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    return stored ? { ...emptyHistories(), ...JSON.parse(stored) } : emptyHistories();
  } catch (error) {
    console.error("Failed to read score history:", error);
    return emptyHistories();
  }
}

export async function recordHistory(score, total, difficulty = "any") {
  const histories = await getScoreHistories();
  if (!total) return histories;

  const entry = { score, total, percent: Math.round((score / total) * 100), date: Date.now() };
  const next = {
    ...histories,
    [difficulty]: [entry, ...histories[difficulty]].slice(0, HISTORY_LIMIT),
  };

  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Failed to save score history:", error);
    return histories;
  }
  return next;
}
