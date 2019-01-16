import React from 'react';

function GameOver ({ resetGame }) {
  return (
    <div>
      <h1 className="game-over">Game Over!</h1>
      <button 
        className="ui positive basic button massive start-button"
        onClick={resetGame}>
        Start
      </button>
    </div>
  );
}

export default GameOver;