import { useState } from 'react';

import Header from '../Header';
import Game from '../Game';
import Footer from '../Footer';
import { handleGameRoundsSingleplayer } from '../Functions';

export default function Singleplayer() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);

  const handlePlayerMove = (playerMove) => {
    handleGameRoundsSingleplayer(
      playerMove,
      playerScore,
      setPlayerScore,
      computerScore,
      setComputerScore,
      drawCounter,
      setDrawCounter
    );
  }

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Singleplayer'
        icon='back'
        route='/'
      />

      <Game
        player1Text='YOU'
        player1Score={playerScore}
        player2Text='COM'
        player2Score={computerScore}
        drawCounter={drawCounter}
        handleMove={handlePlayerMove}
        disabledButtons={false}
      />

      <Footer />
    </div>
  );
}