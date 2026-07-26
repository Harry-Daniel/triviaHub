import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { decode } from "html-entities";
import shuffleArray from "../utilities/shuffleArray";
import { getHighScore, recordScore } from "../utilities/highScore";

const QuizContext = createContext(null);

function buildQuestion(raw) {
  const options = shuffleArray([
    ...raw.incorrect_answers.map((text) => ({
      text: decode(text),
      isCorrect: false,
    })),
    { text: decode(raw.correct_answer), isCorrect: true },
  ]);

  return {
    category: decode(raw.category),
    difficulty: raw.difficulty,
    type: raw.type,
    question: decode(raw.question),
    options,
  };
}

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | active | complete | empty
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getHighScore().then(setHighScore);
  }, []);

  const startQuiz = useCallback((rawResults) => {
    if (!rawResults || rawResults.length === 0) {
      setQuestions([]);
      setAnswers([]);
      setCurrentIndex(0);
      setStatus("empty");
      return;
    }
    setQuestions(rawResults.map(buildQuestion));
    setAnswers([]);
    setCurrentIndex(0);
    setStatus("active");
  }, []);

  const selectAnswer = useCallback(
    (optionIndex) => {
      setAnswers((prev) => {
        if (prev[currentIndex] !== undefined) return prev;
        const next = [...prev];
        next[currentIndex] = optionIndex;
        return next;
      });
    },
    [currentIndex],
  );

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= questions.length) {
        setStatus("complete");
        return prev;
      }
      return nextIndex;
    });
  }, [questions.length]);

  const reset = useCallback(() => {
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setStatus("idle");
  }, []);

  const score = useMemo(
    () =>
      answers.reduce((total, optionIndex, index) => {
        const question = questions[index];
        if (question && question.options[optionIndex]?.isCorrect) return total + 1;
        return total;
      }, 0),
    [answers, questions],
  );

  useEffect(() => {
    if (status !== "complete") return;
    recordScore(score, questions.length).then(setHighScore);
  }, [status]);

  const value = useMemo(
    () => ({
      questions,
      currentIndex,
      answers,
      status,
      score,
      highScore,
      startQuiz,
      selectAnswer,
      goNext,
      reset,
    }),
    [
      questions,
      currentIndex,
      answers,
      status,
      score,
      highScore,
      startQuiz,
      selectAnswer,
      goNext,
      reset,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
