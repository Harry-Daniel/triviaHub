export default async function getQuestions(numQuestions, category) {
  const params = `?amount=${numQuestions}&${category === "any" ? "" : "category=" + category}`;
  //   console.log("fetch start");
  const response = await fetch(`https://opentdb.com/api.php${params}`);
  const data = await response.json();
  return data;
}
