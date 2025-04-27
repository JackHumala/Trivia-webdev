import React, { useState } from 'react';
import Card from '../Card/Card';
import Score from '../Score/Score';
import LeaderboardEntry from '../LeaderboardEntry/LeaderboardEntry';
import axios from 'axios';


function App() {
  const [score, setScore] = useState(0); // State for game score
  const [isGameOver, setIsGameOver] = useState(false); // State for game status


  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const handleSubmit = async (name, score) => {
    try {
      const response = await axios.post('http://localhost:5000/api/leaderboard', {
        name,
        score,
      });
      console.log('Score submitted successfully:', response.data);
    } 
    catch (error) {
      if (error.response) {
        console.error('Error submitting score:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="app">
      <Score score={score} />
      {isGameOver ? (
        <LeaderboardEntry score={score} onSubmit={handleSubmit} /> // Render the LeaderboardEntry component when the game is over
      ) : (
        <Card score={score} setScore={setScore} onGameOver={handleGameOver} />
      )}
    </div>
  );
}

export default App;