
const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

const determineWinner = (player1Choice, player2Choice) => {
  const choices = ['rock', 'paper', 'scissors'];
  const player1Index = choices.indexOf(player1Choice);
  const player2Index = choices.indexOf(player2Choice);

  if (player1Index === player2Index) {
    return 'tie';
  }

  if ((player1Index + 1) % 3 === player2Index) {
    return 'player2';
  }

  return 'player1';
};


let totalScore = { player1: 0, player2: 0 };
let totalRounds = 0;


app.post('/api/play-round', (req, res) => {
  const { player1Choice, player2Choice } = req.body;
  const winner = determineWinner(player1Choice, player2Choice);


  if (winner === 'player1') {
    totalScore.player1 += 1;
  } else if (winner === 'player2') {
    totalScore.player2 += 1;
  }

 
  totalRounds += 1;

  if (totalRounds === 6) {
    const gameOverMessage = `Game over! Final score: ${totalScore.player1} - ${totalScore.player2}`;
    res.json({ message: gameOverMessage, score: totalScore, rounds: totalRounds });
  } else {
    res.json({ score: totalScore, rounds: totalRounds, winner });
  }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});