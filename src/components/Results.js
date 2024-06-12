import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Results.css';

const Results = () => {
let { score } = useParams();

return (
<div className="results-container">
<div className="card">
<h2>Ваш счёт</h2>
<p>Вы ответили правильно на {score} Вопросов</p>

<Link to="/">Домой</Link>
</div>
</div>
);
};

export default Results;