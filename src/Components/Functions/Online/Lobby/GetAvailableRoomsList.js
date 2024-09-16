import { ReadyState } from 'react-use-websocket';

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