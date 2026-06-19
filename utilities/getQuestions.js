export default async function getQuestions(numQuestions, category) {
  try {
    const params = `?amount=${numQuestions}&${
      category === "any" ? "" : "category=" + category
    }`;

    const response = await fetch(`https://opentdb.com/api.php${params}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
