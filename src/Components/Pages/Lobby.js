/* eslint-disable */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { Button } from 'react-bootstrap';
import { FiPlusCircle, FiArrowRightCircle } from 'react-icons/fi';

import Header from '../Header';
import LobbyModal from '../LobbyModal';
import Footer from '../Footer';

import {
  getWsConnectionUrl,
  handleClientConnection,
  getAvailableRoomsList,
  updateAvailableRooms
} from '../Functions';

import {
  useGameParameters
} from '../../Contexts/GameParametersContext';

export default function Lobby() {
  const [roomCode, setRoomCode] = useState();
  const [publicRoom, setPublicRoom] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [serverCalled, setServerCalled] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  const { setGameParameters } = useGameParameters();
  const navigate = useNavigate();
  const ws = useWebSocket(getWsConnectionUrl);
  const { sendJsonMessage, readyState, lastMessage } = ws;

  //#region Local functions / Funções locais
  const handleCreateRoom = () => {
    const time = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date()).replace(':', '');

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const roomCode = Number(String(randomCode) + String(time));

    setGameParameters('create', (publicRoom) ? 'Y' : 'N', roomCode);
    navigate('/multiplayer');
  }

  const handleJoinRoom = (room) => {
    setGameParameters('join', '', room || roomCode);
    navigate('/multiplayer');
  }
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    const clientConnected = handleClientConnection(
      serverCalled,
      setServerCalled,
      readyState,
      navigate
    );

    if (clientConnected) {
      getAvailableRoomsList(readyState, sendJsonMessage);
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    updateAvailableRooms(lastMessage, setAvailableRooms);
  }, [lastMessage]);

  useEffect(() => {
    (roomCode) ? setDisabledButton(false) : setDisabledButton(true);
  }, [roomCode]);

  useEffect(() => {
    setGameParameters('', '', 0);
  }, []);
  //#endregion

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Multiplayer'
        icon='back'
        route='/'
      />

      <main className='w-100 overflow-auto mx-auto mt-5 mb-4 px-3 py-1'>
        <div className='col col-md-9 col-lg-6 mx-auto'>
          <div>
            <Button
              type='primary'
              className='w-100'
              onClick={() => setIsCreateModalOpen(true)}
            >
              <FiPlusCircle /> CREATE A ROOM
            </Button>
          </div>

          <LobbyModal
            isModalOpen={isCreateModalOpen}
            setIsModalOpen={setIsCreateModalOpen}
            modalTitle='Create Room'
            publicRoom={publicRoom}
            setPublicRoom={setPublicRoom}
            buttonAction={handleCreateRoom}
            disabledButton={false}
          />

          <div className='pt-2'>
            <Button
              type='primary'
              className='w-100'
              onClick={() => setIsJoinModalOpen(true)}
            >
              <FiArrowRightCircle /> JOIN A ROOM
            </Button>
          </div>

          <LobbyModal
            isModalOpen={isJoinModalOpen}
            setIsModalOpen={setIsJoinModalOpen}
            modalTitle='Join Room'
            roomCode={roomCode}
            setRoomCode={setRoomCode}
            buttonAction={() => handleJoinRoom('')}
            disabledButton={disabledButton}
          />

          <div className='pt-3'>
            <div className='card'>
              <div className='card-header fw-bold text-center'>
                Public Rooms
              </div>
              <div
                className='card-body text-center overflow-auto'
                style={{ maxHeight: '30vh' }}
              >
                {(availableRooms.length > 0) ? (
                  <div>
                    {availableRooms.map((rooms) => (
                      <div key={rooms}>
                        <Button
                          variant='outline-primary'
                          onClick={() => handleJoinRoom(rooms)}
                          className='w-100 my-1'
                          size='sm'
                        >
                          <FiArrowRightCircle /> {rooms}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>No public rooms available.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}