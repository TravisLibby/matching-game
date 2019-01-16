import React from 'react';

function StartScreen ({ startCountdown }) {
  return (
    <div>
      <h1 className="game-title">Matching Game</h1>
      <button 
        className="ui positive basic button massive start-button"
        onClick={startCountdown}>
        Start
      </button>
    </div>
  );
}

export default StartScreen;