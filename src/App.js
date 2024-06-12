import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TitleScreen from './components/TitleScreen';
import QuizSelection from './components/QuizSelection';
import QuizPage from './components/QuizPage';
import Results from './components/Results';
import TopBar from './components/TopBar';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact component={TitleScreen} />
        <Route path="/select-quiz/:packNumber" component={QuizSelection} />
        <Route path="/quiz/:quizId" component={QuizPage} />
        <Route path="/results/:score" component={Results} />
      </Switch>
    </Router>
  );
};

export default App;