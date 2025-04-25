// src/App.js
import React, { useState } from 'react';
import './App.css';

import MainMenu    from './Components/MainMenu/MainMenu';
import Card        from './Components/Card/Card';
import Leaderboard from './Components/Leaderboard';

function App() {
  
  const [view, setView] = useState('menu');

  const startGame       = () => setView('game');
  const showLeaderboard = () => setView('leaderboard');
  const backToMenu      = () => setView('menu');

  return (
    <div className="App">
      {view === 'menu' && (
        <MainMenu
          onStart={startGame}
          onViewLeaderboard={showLeaderboard}
        />
      )}

      {view === 'game' && (
        <>
          <button className="back-btn" onClick={backToMenu}>
            ← Back to Menu
          </button>
          <Card onGameOver={backToMenu} />
        </>
      )}

      {view === 'leaderboard' && (
        <>
          <button className="back-btn" onClick={backToMenu}>
            ← Back to Menu
          </button>
          <Leaderboard />
        </>
      )}
    </div>
  );
}

export default App;
