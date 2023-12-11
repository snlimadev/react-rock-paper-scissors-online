import { ReadyState } from 'react-use-websocket';
import Swal from 'sweetalert2';

const customSwal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary"
  },
  buttonsStyling: false,
  background: 'var(--bs-body-bg)',
  color: 'var(--bs-body-color)'
});

export function getWsConnectionUrl() {
  return 'wss://api-rock-paper-scissors-online.glitch.me';
}

//#region Local function to show game result
// Função local para exibir o resultado do jogo
function showResultAlert(icon, title, text) {
  customSwal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}
//#endregion

//#region Function to handle game rounds (singleplayer)
// Função para lidar com as rodadas do jogo (um jogador)
export function handleGameRoundsSingleplayer(
  playerMove,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore,
  drawCounter,
  setDrawCounter
) {
  const moves = ['ROCK', 'PAPER', 'SCISSORS'];
  const computerMove = moves[Math.floor(Math.random() * moves.length)];

  if (playerMove === computerMove) {
    showResultAlert(
      'warning',
      'Draw',
      `Both players chose ${playerMove}.`
    );

    setDrawCounter(drawCounter + 1);
  } else if (
    (playerMove === 'ROCK' && computerMove === 'SCISSORS') ||
    (playerMove === 'PAPER' && computerMove === 'ROCK') ||
    (playerMove === 'SCISSORS' && computerMove === 'PAPER')
  ) {
    showResultAlert(
      'success',
      'You win',
      `${playerMove} beats ${computerMove}.`
    );

    setPlayerScore(playerScore + 1);
  } else {
    showResultAlert(
      'error',
      'Computer wins',
      `${computerMove} beats ${playerMove}.`
    );

    setComputerScore(computerScore + 1);
  }
}
//#endregion

//#region Function to handle client connection
// Função para lidar com a conexão do cliente
export function handleClientConnection(
  serverCalled,
  setServerCalled,
  readyState,
  navigate
) {
  if (!serverCalled) {
    customSwal.fire({
      title: 'Connecting...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setServerCalled(true);
    return false;
  } else {
    if (readyState === ReadyState.OPEN) {
      Swal.close();
      return true;
    } else {
      customSwal.fire({
        icon: 'error',
        text: 'Connection to the server lost or expired. ' +
          'Please check your internet connection and try again later.'
      });

      navigate('/');
      return false;
    }
  }
}
//#endregion

//#region Function to get the available rooms list
// Função para obter a lista de salas disponíveis
export function getAvailableRoomsList(readyState, sendJsonMessage) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      action: 'getRooms'
    };

    sendJsonMessage(message);
  }
};
//#endregion

//#region Function to update the available rooms list
// Função para atualizar a lista de salas disponíveis
export function updateAvailableRooms(lastMessage, setAvailableRooms) {
  if (lastMessage?.data) {
    try {
      const data = JSON.parse(lastMessage.data);

      if (data.rooms) {
        setAvailableRooms(data.rooms);
      }
    } catch (error) {
      console.error(
        'Failed to parse message data: ' + lastMessage.data
      );
    }
  }
};
//#endregion

//#region Function to create or join a game room
// Função para criar uma sala de jogo
export function createOrJoinRoom(
  action,
  publicRoom,
  roomCode,
  readyState,
  sendJsonMessage
) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      action: action,
      isPublic: publicRoom,
      roomCode: roomCode,
    };

    sendJsonMessage(message);
  }
};
//#endregion

//#region Function make a move
// Função para fazer uma jogada
export function makeMove(move, readyState, sendJsonMessage) {
  if (readyState === ReadyState.OPEN) {
    const message = {
      move: move
    };

    sendJsonMessage(message);
  }
};
//#endregion

//#region Function to handle game rounds (multiplayer)
// Função para lidar com as rodadas do jogo (dois jogadores)
export function handleGameRoundsMultiplayer(
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
) {
  if (lastMessage?.data) {
    try {
      const data = JSON.parse(lastMessage.data);

      if (data.winner && data.description) {
        if (data.winner === 'DRAW') {
          showResultAlert('warning', 'Draw', data.description);
          setDrawCounter(drawCounter + 1);
        } else if (data.winner === player) {
          showResultAlert('success', 'You win', data.description);
          setPlayerScore(playerScore + 1);
        } else {
          showResultAlert('error', 'Opponent wins', data.description);
          setOpponentScore(opponentScore + 1);
        }
      } else if (data.event) {
        if (data.event === 'Opponent joined the game.') {
          setGameStart(true);
        } else if (data.event === 'Opponent left the game.') {
          customSwal.fire({
            icon: 'info',
            title: 'Opponent left. Final score:',
            html: `YOU <b>${playerScore}</b> x <b>${opponentScore}</b> OPP`
              + `<br/><b>${drawCounter}</b> DRAWS`
          });

          navigate('/');
        }
      } else if (data.error) {
        customSwal.fire({
          icon: 'error',
          text: data.error
        });

        navigate('/');
      }
    } catch (error) {
      console.error('Failed to parse message data: ' + lastMessage.data);
    }
  }
}
//#endregion
