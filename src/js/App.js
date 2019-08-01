import React from 'react';
import {Container} from 'reactstrap';
import Quiz from './components/Quiz';

const App = function() {
  return (
    <Container className="quiz-container">
      <Quiz />
    </Container>
  );
}

export default App
