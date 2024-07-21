import React, { useState, useEffect } from "react";
import "./index.css";


// Question bank (50 questions)
const questionBank = [
  {
    question: "Who does Mike Delfino marry in season 3?",
    options: [
      "Susan Mayer",
      "Edie Britt",
      "Katherine Mayfair",
      "Gabrielle Solis"
    ],
    correctAnswer: 0
  },
  {
    question: "What secret is Orson Hodge hiding about his past?",
    options: [
      "He's a spy",
      "He killed his wife",
      "He's actually poor",
      "He has another family"
    ],
    correctAnswer: 1
  },
  {
    question: "Who does Gabrielle marry after divorcing Carlos?",
    options: ["Victor Lang", "Tom Scavo", "Mike Delfino", "Orson Hodge"],
    correctAnswer: 0
  },
  {
    question: "What tragedy strikes Lynette's family?",
    options: ["House fire", "Car accident", "Tornado", "Cancer diagnosis"],
    correctAnswer: 3
  },
  {
    question: "Who does Bree pretend is the father of Danielle's baby?",
    options: ["Rex Van de Kamp", "Orson Hodge", "Mike Delfino", "Tom Scavo"],
    correctAnswer: 1
  }
  // ... Add 45 more questions here to reach a total of 50
];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    // Randomly select 10 questions
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (selectedIndex) => {
    const currentQ = questions[currentQuestion];
    setSelectedAnswer(selectedIndex);

    if (selectedIndex === currentQ.correctAnswer) {
      setFeedbackType("correct");
      setShowFeedback(true);
      if (attempts === 0) {
        setScore((prev) => prev + 3);
      } else if (attempts === 1) {
        setScore((prev) => prev + 1);
      }
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setFeedbackType("incorrect");
      setShowFeedback(true);
      setScore((prev) => prev - 1);
      setAttempts((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowFeedback(false);
      setAttempts(0);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setAttempts(0);
    setQuizCompleted(false);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
        <p className="text-4xl font-bold text-center mb-4">{score} points</p>
        <p className="text-xl text-center mb-4">
          You got {correctAnswers} out of 10 questions right!
        </p>
        <button
          onClick={restartQuiz}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl relative">
      <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 text-xl font-bold">
        Score: {score}
      </div>
      <h1 className="text-2xl font-bold mb-4">Desperate Housewives Quiz</h1>
      <p className="text-gray-600 mb-4">Season 3</p>
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          Question {currentQuestion + 1} out of 10
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      <p className="font-semibold mb-4">{currentQ.question}</p>
      {currentQ.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          className={`w-full mb-2 py-2 px-4 rounded-lg font-semibold ${
            selectedAnswer === index
              ? index === currentQ.correctAnswer
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          disabled={selectedAnswer === currentQ.correctAnswer}
        >
          {option}
        </button>
      ))}
      {showFeedback && (
        <div
          className={`mt-4 p-2 rounded-lg ${
            feedbackType === "correct"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <p className="font-bold">
            {feedbackType === "correct"
              ? `Correct! You gained ${attempts === 0 ? 3 : 1} points!`
              : "Incorrect. Try again. You lost 1 point."}
          </p>
        </div>
      )}
      {selectedAnswer === currentQ.correctAnswer && (
        <button
          onClick={nextQuestion}
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Quiz;
