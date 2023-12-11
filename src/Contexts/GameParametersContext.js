import {
  createContext,
  useContext,
  useState
} from 'react';

const GameParametersContext = createContext();

export function useGameParameters() {
  return useContext(GameParametersContext);
}

export function GameParametersProvider({ children }) {
  const [action, setAction] = useState('');
  const [publicRoom, setPublicRoom] = useState('');
  const [roomCode, setRoomCode] = useState(0);

  const setGameParameters = (p_action, p_publicRoom, p_roomCode) => {
    setAction(p_action);
    setPublicRoom(p_publicRoom);
    setRoomCode(p_roomCode);
  };

  return (
    <GameParametersContext.Provider
      value={{ action, publicRoom, roomCode, setGameParameters }}
    >
      {children}
    </GameParametersContext.Provider>
  );
}