import React from 'react';
import { useHistory } from 'react-router-dom';
import './TitleScreen.css';

const TitleScreen = () => {
    const history = useHistory();

    const navigateToPack = (packNumber) => {
        history.push(`/select-quiz/${packNumber}`);
    };

    return (
        <div className="title-screen">
            <h1>IT-English</h1>
            <p>Выберите юнит</p>
            <button onClick={() => navigateToPack(1)}>Unit 1 - Nice to me you </button>
            <button onClick={() => navigateToPack(2)}>Unit 2 - About myself</button>
            <button onClick={() => navigateToPack(3)}>Unit 3 - About my family</button>
            <button onClick={() => navigateToPack(4)}>Unit 4 - My office</button>
        </div>
    );
};

export default TitleScreen;
