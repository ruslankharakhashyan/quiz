import React, {Component} from 'react';
import { Container, Progress, Button, Row, Col } from 'reactstrap';
import ReactStars from 'react-stars';

import ScoreBar from './ScoreBar';

import data from '../../data/questions.json';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      correctAnswers: 0,
      correctAnswer: decodeURIComponent(data[0].correct_answer),
      answer: '',
      answers: this.getAnswers(0)
    }
  }

  getAnswers = index => {
    let answers = [data[index].correct_answer, ...data[index].incorrect_answers].map(val => decodeURIComponent(val));
    var currentIndex = answers.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = answers[currentIndex];
      answers[currentIndex] = answers[randomIndex];
      answers[randomIndex] = temporaryValue;
    }
    return answers;
  }

  handleAnswerClick = answer => {

    const cAnswers = (answer === this.state.correctAnswer ? this.state.correctAnswers + 1 : this.state.correctAnswers);

    this.setState({
      answer: answer,
      correctAnswers: cAnswers
    });
  }

  handleNextClick = () => {
    if (this.state.currentIndex < data.length - 1) {
      const index = this.state.currentIndex + 1;
      this.setState({
        currentIndex: index,
        answer: '',
        answers: this.getAnswers(index),
        correctAnswer: decodeURIComponent(data[index].correct_answer),
      });
    }
    else {
      this.setState({
        currentIndex: 0,
        correctAnswers: 0,
        correctAnswer: decodeURIComponent(data[0].correct_answer),
        answer: '',
        answers: this.getAnswers(0)
      });
    }
  }

  render() {
    const {currentIndex, answer, correctAnswer, correctAnswers, answers} = this.state;
    const progressQuiz = Math.round((currentIndex + 1) * 100 / data.length);
    let difficulty = 0;

    switch (data[currentIndex].difficulty) {
      case 'easy':
        difficulty = 1;
        break;
      case 'medium':
        difficulty = 2;
        break;
      case 'hard':
        difficulty = 3;
        break;
      default:
        difficulty = 0;
    };

    return (
      <div className="quiz-panel">
        <Progress value={progressQuiz} className="progress-quiz" />
        <div className="main">
          <div className="content">
            <h1 className="quiz-title">{ `Question ${currentIndex + 1} of ${data.length}` }</h1>
            <p className="category">{decodeURIComponent(data[currentIndex].category)}</p>
            <ReactStars count={5} size={24} color2={'#000000'} color1={'#cbcccb'} value={difficulty} edit={false} />
            <h2 className="question">{ decodeURIComponent(data[15].question) }</h2>
            <Container className={`answer-container ${answer !== '' && 'answered'}`}>
              <Row>
                {
                  answers.map((value, index) => (
                    <Col sm={6} xs={12} key={index}>
                      <Button outline 
                        className={`${answer === value && 'answer'} ${correctAnswer === value && ' correct-answer'}`}
                        disabled={answer !== ''}
                        onClick={() => this.handleAnswerClick(value)}
                      >
                        {value}
                      </Button>
                    </Col>
                  ))
                }                  
              </Row>
            </Container>
            {answer !== '' &&
              <div className="evaluation">
                <h1 className="title">{`${answer === correctAnswer ? 'Correct' : 'Sorry'}!`}</h1>
                <Button outline onClick={this.handleNextClick}>{currentIndex < data.length - 1 ? 'Next Question' : 'Try Again'}</Button>
              </div>
            }
          </div>
          <ScoreBar answeredQuiz={answer === '' ? currentIndex : currentIndex + 1} totalQuiz={data.length} correctAnswers={correctAnswers} />
        </div>
      </div>
    );
  }
}

export default Quiz
