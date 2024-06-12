
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import quizzes from '../quizzesData';
import './QuizSelection.css';

const QuizPack = () => {
    let { packNumber } = useParams();

    const startId = (packNumber - 1) * 100 + 1; // в юните максимум 100 упражнений
    const endId = packNumber * 100;

    const filteredQuizzes = quizzes.filter(quiz => quiz.id >= startId && quiz.id <= endId);

    return (
        <div className="quiz-pack-container">
            <h2>Unit {packNumber}</h2>
            <ul className="quiz-list">
                {filteredQuizzes.map((quiz) => (
                    <li key={quiz.id}>
                        <Link to={`/quiz/${quiz.id}`} className="quiz-link">{quiz.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizPack;
