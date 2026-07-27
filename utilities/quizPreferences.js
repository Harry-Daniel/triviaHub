import AsyncStorage from "@react-native-async-storage/async-storage";

const DIFFICULTY_KEY = "triviahub:selectedDifficulty";
const GAME_TYPE_KEY = "triviahub:selectedGameType";

export async function getQuizPreferences() {
  try {
    const [difficulty, gameType] = await Promise.all([
      AsyncStorage.getItem(DIFFICULTY_KEY),
      AsyncStorage.getItem(GAME_TYPE_KEY),
    ]);
    return { difficulty: difficulty ?? "any", gameType: gameType ?? "any" };
  } catch (error) {
    console.error("Failed to read quiz preferences:", error);
    return { difficulty: "any", gameType: "any" };
  }
}

export async function setDifficultyPreference(difficulty) {
  try {
    await AsyncStorage.setItem(DIFFICULTY_KEY, difficulty);
  } catch (error) {
    console.error("Failed to save difficulty preference:", error);
  }
}

export async function setGameTypePreference(gameType) {
  try {
    await AsyncStorage.setItem(GAME_TYPE_KEY, gameType);
  } catch (error) {
    console.error("Failed to save game type preference:", error);
  }
}
