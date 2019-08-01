import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class ScoreBar extends Component {
  render() {
    const {answeredQuiz, totalQuiz, correctAnswers} = this.props;
    const minScore = Math.round(correctAnswers * 100 / totalQuiz);
    const currentScore = answeredQuiz === 0 ? 0 : Math.round(correctAnswers * 100 / answeredQuiz);
    const maxScore = Math.round((correctAnswers + totalQuiz - answeredQuiz) * 100 / totalQuiz);
    return (
      <div className="score-bar">
        <div className="score-text">
          <span>{ `Score: ${currentScore}%` }</span>
          <span>{ `Max Score: ${maxScore}%` }</span>
        </div>
        <Progress multi>
          <Progress bar className="min-score" value={minScore} />
          <Progress bar className="current-score" value={currentScore - minScore} />
          <Progress bar className="max-score" value={maxScore - currentScore} />
        </Progress>
      </div>
    )
  }
}

export default ScoreBar
