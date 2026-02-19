import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(60);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = "Adding what single letter to the word 'CONTACT' makes it smaller?";
  const correctAnswer = 'R';

  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'playing') {
      setGameState('result');
      setIsCorrect(false);
    }
    return () => clearInterval(interval);
  }, [gameState, timer]);

  const handleStartGame = () => {
    setGameState('playing');
    setTimer(60);
    setUserAnswer('');
    setIsCorrect(null);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim().toUpperCase() === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setGameState('result');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'playing':
        return (
          <div className="card">
            <h2>{question}</h2>
            <form onSubmit={handleAnswerSubmit}>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                autoFocus
              />
              <button type="submit">Submit</button>
            </form>
            <div className="timer">Time left: {timer}</div>
          </div>
        );
      case 'result':
        return (
          <div className="card">
            {isCorrect ? (
              <div className="result correct">
                <h1>Correct!</h1>
              </div>
            ) : (
              <div className="result incorrect">
                <h1>Time's up or incorrect!</h1>
                <p>The correct answer is: "{correctAnswer}" which makes "CONTRACT".</p>
              </div>
            )}
            <button onClick={handleStartGame}>Play Again</button>
          </div>
        );
      case 'start':
      default:
        return (
          <div>
            <h1>Percentages Quiz</h1>
            <button onClick={handleStartGame}>Start Game</button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <div className="cosmic-bg"></div>
      {renderGameState()}
    </div>
  );
}

export default App;
