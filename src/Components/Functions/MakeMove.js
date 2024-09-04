import { ReadyState } from 'react-use-websocket';

//#region Function to make a move
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