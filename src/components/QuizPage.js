
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

  if (!quiz) return <div>Страница не найдена</div>;

  const checkAnswerAndProceed = (answer) => {
    let isCorrect = false;
    if (quiz.questions[currentQuestionIndex].type === "multiple-choice") { // сравнение ответов разных типов
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

    setIsAnswerSubmitted(true); // если отвечен то true

    if (currentQuestionIndex >= quiz.questions.length - 1) { // если последний вопрос отвечен то перейти на страницу результатов
      history.push(`/results/${correctAnswersCount + (isCorrect ? 1 : 0)}`);
    } else { // если не последний то вопрс +1 и false
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserInput('');
        setIsAnswerSubmitted(false); 
      }, 1000); // задержка для высвечивания
    }
  };

  const handleOptionSelect = (option) => { // сравнение вариантов
    setUserInput(option);
    checkAnswerAndProceed(option);
  };

  const handleInputChange = (e) => { //сравнение текста
    setUserInput(e.target.value);
  };

  // нажатие enter для потдверждения
  const handleKeyPressOnBlank = (e) => {
    if (e.key === 'Enter') {
      checkAnswerAndProceed(userInput);
    }
  };

  const handleMatchSetsAnswerSubmit = (answer) => { //сравнения matchsets.js вопросов
    checkAnswerAndProceed(answer);
  };

  const handleCategorySortAnswerSubmit = (answer) => { //сравнения categorysort.js вопросов
    checkAnswerAndProceed(answer);
  };

  return ( // HTML Страница
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
              disabled={isAnswerSubmitted} // 
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
