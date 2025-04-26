import React from 'react';
import Leaderboard from './components/Leaderboard';

import './App.css';

function App() {
  const handleAddScore = (name, score) => {
  };

  return (
    <div className="App">
      <h1>Trivia Time Leaderboard</h1>
      <Leaderboard />
    </div>
  );
}


export default App;
