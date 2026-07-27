export default async function getQuestions(numQuestions, category, difficulty = "any", type = "any") {
  try {
    const params = [
      `amount=${numQuestions}`,
      category !== "any" && `category=${category}`,
      difficulty !== "any" && `difficulty=${difficulty}`,
      type !== "any" && `type=${type}`,
    ]
      .filter(Boolean)
      .join("&");

    const response = await fetch(`https://opentdb.com/api.php?${params}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
