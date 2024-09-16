import { showResultAlert } from '../Utils';

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