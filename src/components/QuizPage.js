
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import quizzes from '../quizzesData';
import './QuizPage.css';
import MatchSetsQuestion from './MatchSetsQuestion';
import CategorySortQuestion from './CategorySortQuestion';

const QuizPage = () => {
  const { quizId } = useParams();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const quiz = quizzes.find(quiz => quiz.id === parseInt(quizId));

  if (!quiz) return <div>Quiz not found!</div>;

  const checkAnswerAndProceed = (answer) => {
    let isCorrect = false;
    if (quiz.questions[currentQuestionIndex].type === "multiple-choice") {
      isCorrect = answer === quiz.questions[currentQuestionIndex].correctAnswer;
    } else if (quiz.questions[currentQuestionIndex].type === "fill-in-the-blank") {
      isCorrect = answer.toLowerCase().trim() === quiz.questions[currentQuestionIndex].correctAnswer.toLowerCase().trim();
    } else if (quiz.questions[currentQuestionIndex].type === "match-sets") {
      isCorrect = JSON.stringify(answer) === JSON.stringify(quiz.questions[currentQuestionIndex].correctAnswer);
    } else if (quiz.questions[currentQuestionIndex].type === "category-sort") {
      isCorrect = JSON.stringify(answer) === JSON.stringify(quiz.questions[currentQuestionIndex].correctAnswer);
    }

    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    setIsAnswerSubmitted(true); // Set answer submission state

    if (currentQuestionIndex >= quiz.questions.length - 1) {
      history.push(`/results/${correctAnswersCount + (isCorrect ? 1 : 0)}`);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserInput('');
        setIsAnswerSubmitted(false); // Reset answer submission state
      }, 1000); // Delay of 1 second to show answer feedback
    }
  };

  const handleOptionSelect = (option) => { //Check if selected option is correct 
    setUserInput(option);
    checkAnswerAndProceed(option);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // For fill-in-the-blank, submit on enter key press in the input field and chek if correct
  const handleKeyPressOnBlank = (e) => {
    if (e.key === 'Enter') {
      checkAnswerAndProceed(userInput);
    }
  };

  const handleMatchSetsAnswerSubmit = (answer) => { //Check if match sets are correct
    checkAnswerAndProceed(answer);
  };

  const handleCategorySortAnswerSubmit = (answer) => { //check if sorter questions are correct
    checkAnswerAndProceed(answer);
  };

  return (
    <div className="quiz-container">
      <h2>{quiz.name}</h2>
      <div className="question-text">
        <p>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        {quiz.questions[currentQuestionIndex].type === "multiple-choice" ?
          <p>{quiz.questions[currentQuestionIndex].questionText}</p>
          :
          (
            <span>
              {quiz.questions[currentQuestionIndex].questionText.split('___').map((part, index, arr) =>
                index < arr.length - 1 ? (<React.Fragment key={index}>{part}<input type="text" value={userInput} onChange={handleInputChange} onKeyPress={handleKeyPressOnBlank} className="blank-input" /></React.Fragment>) : part)}
            </span>
          )
        }

        {quiz.questions[currentQuestionIndex].type === "multiple-choice" &&
          quiz.questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${isAnswerSubmitted && option === quiz.questions[currentQuestionIndex].correctAnswer ? 'correct' : isAnswerSubmitted && option !== quiz.questions[currentQuestionIndex].correctAnswer ? 'incorrect' : ''}`}
              onClick={() => handleOptionSelect(option)}
              disabled={isAnswerSubmitted} // Disable buttons after answer submission
            >
              {option}
            </button>
          ))
        }

        {quiz.questions[currentQuestionIndex].type === "match-sets" && (
          <MatchSetsQuestion
            question={quiz.questions[currentQuestionIndex]}
            onAnswerSubmit={handleMatchSetsAnswerSubmit}
          />
        )}

        {quiz.questions[currentQuestionIndex].type === "category-sort" && (
          <CategorySortQuestion
            question={quiz.questions[currentQuestionIndex]}
            onAnswerSubmit={handleCategorySortAnswerSubmit}
          />
        )}

      </div>
    </div>
  );
};

export default QuizPage;