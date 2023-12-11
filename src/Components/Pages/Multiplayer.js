/* eslint-disable */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import Header from '../Header';
import WaitingCard from '../WaitingCard';
import Game from '../Game';
import Footer from '../Footer';

import {
  getWsConnectionUrl,
  handleClientConnection,
  createOrJoinRoom,
  makeMove,
  handleGameRoundsMultiplayer
} from '../Functions';

import {
  useGameParameters
} from '../../Contexts/GameParametersContext';

export default function Multiplayer() {
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [drawCounter, setDrawCounter] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [serverCalled, setServerCalled] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);

  const { action, publicRoom, roomCode } = useGameParameters();
  const player = (action === 'create') ? 'PLAYER 1' : 'PLAYER 2';
  const navigate = useNavigate();
  const ws = useWebSocket(getWsConnectionUrl);
  const { sendJsonMessage, readyState, lastMessage } = ws;

  const handleMove = (move) => {
    setDisabledButtons(true);
    makeMove(move, readyState, sendJsonMessage);
  }

  //#region useEffect hooks
  useEffect(() => {
    const clientConnected = handleClientConnection(
      serverCalled,
      setServerCalled,
      readyState,
      navigate
    );

    if (clientConnected) {
      if (action && roomCode) {
        createOrJoinRoom(
          action,
          publicRoom,
          roomCode,
          readyState,
          sendJsonMessage
        );
      } else {
        navigate('/');
      }
    }
  }, [action, roomCode, readyState, sendJsonMessage]);

  useEffect(() => {
    handleGameRoundsMultiplayer(
      lastMessage,
      player,
      playerScore,
      setPlayerScore,
      opponentScore,
      setOpponentScore,
      drawCounter,
      setDrawCounter,
      setGameStart,
      navigate
    );

    setDisabledButtons(false);
  }, [lastMessage]);
  //#endregion

  return (
    <div className='vh-100'>
      <Header
        title={`Room ${roomCode}`}
        icon='back'
        route='/lobby'
      />

      {(!gameStart) ? (
        <WaitingCard roomCode={roomCode} />
      ) : (
        <Game
          player1Text='YOU'
          player1Score={playerScore}
          player2Text='OPP'
          player2Score={opponentScore}
          drawCounter={drawCounter}
          handleMove={handleMove}
          disabledButtons={disabledButtons}
        />
      )}

      <Footer />
    </div>
  );
}