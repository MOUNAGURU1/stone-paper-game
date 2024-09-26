import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [rounds, setRounds] = useState(0);
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handlePlayer1Choice = (choice) => {
    setPlayer1Choice(choice);
  };

  const handlePlayer2Choice = (choice) => {
    setPlayer2Choice(choice);
  };

  const handleNextRound = () => {
    axios.post('/api/play-round', { player1Choice, player2Choice })
      .then((response) => {
        setScore(response.data.score);
        setRounds(response.data.rounds);
        setWinner(response.data.winner);
        if (response.data.rounds === 6) {
          setGameOver(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (gameOver) {
      alert(`Game Over! Final Score: ${score.player1} - ${score.player2}`);
      setScore({ player1: 0, player2: 0 });
      setRounds(0);
      setWinner('');
      setGameOver(false);
    }
  }, [gameOver, score]);

  return (
    <div>
      <h1>Stone Paper Scissors</h1>
      <div className='player1'>
        <button className='rock' onClick={() => handlePlayer1Choice('rock')}>Srone</button>
        <button className='paper' onClick={() => handlePlayer1Choice('paper')}>Paper</button>
        <button className='sc' onClick={() => handlePlayer1Choice('scissors')}>Scissors</button>
      </div>
      <div >
        <button className='rock' onClick={() => handlePlayer2Choice('rock')}>Stone</button>
        <button className='paper' onClick={() => handlePlayer2Choice('paper')}>Paper</button>
        <button className='sc' onClick={() => handlePlayer2Choice('scissors')}>Scissors</button>
      </div>
      <button className='next' onClick={handleNextRound}>Next Round</button>
      <p className='score'>Score: {score.player1} - {score.player2}</p>
      <p className='round'>Rounds: {rounds}</p>
      {winner && <p className='win'>Winner: {winner}</p>}
    </div>
  );
}

export default App;