import { ReadyState } from 'react-use-websocket';

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