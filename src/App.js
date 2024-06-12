import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TitleScreen from './components/TitleScreen';
import QuizSelection from './components/QuizSelection';
import QuizPage from './components/QuizPage';
import Results from './components/Results';
import TopBar from './components/TopBar';
import PDFViewer from './components/PDFViewer';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route path="/" exact component={TitleScreen} />
        <Route path="/select-quiz/:packNumber" component={QuizSelection} />
        <Route path="/quiz/:quizId" component={QuizPage} />
        <Route path="/results/:score" component={Results} />
        <Route path="/pdf-viewer" component={PDFViewer} />
      </Switch>
    </Router>
  );
};

export default App;