import { customSwal, showResultAlert } from './Utils';

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