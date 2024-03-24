import React, { useState, useEffect } from 'react';
import './TriviaQuizGame.css';

const TriviaQuizGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch('http://localhost:8000/results');
    const data = await response.json();
    setQuestions(data);
  };

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correct_answer;
    setUserAnswers([...userAnswers, { question: questions[currentQuestion].question, answer, isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  if (currentQuestion === questions.length) {
    return (
      <div>
        <h1>Quiz Complete!</h1>
        <p>Your Score: {score}/{questions.length}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    
    <div>
      <h1>Trivia Quiz Game</h1>
      <p>Question {currentQuestion + 1}/{questions.length}</p>
      <h2>{questions[currentQuestion].question}</h2>
      <div>
        {shuffleArray([...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]).map((answer) => (
          <button key={answer} onClick={() => handleAnswerClick(answer)}>{answer}</button>
        ))}
      </div>
    </div>
  );
};

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default TriviaQuizGame;
