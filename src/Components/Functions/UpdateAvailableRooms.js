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
      console.error('Failed to parse message data: ' + lastMessage.data);
    }
  }
};
//#endregion