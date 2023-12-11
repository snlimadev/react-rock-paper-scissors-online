import { Button, Modal } from 'react-bootstrap';

export default function LobbyModal(props) {
  return (
    <Modal
      show={props.isModalOpen}
      onHide={() => props.setIsModalOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='ps-4 ms-auto'>
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(props.modalTitle === 'Create Room') ? (
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={props.publicRoom}
              onChange={() => props.setPublicRoom(!props.publicRoom)}
            />

            <label className='form-check-label'>Public room</label>
          </div>
        ) : (
          <input
            className='form-control'
            type='number'
            placeholder='Enter the room code'
            value={props.roomCode}
            onChange={(e) => props.setRoomCode(e.target.value)}
            autoFocus={true}
          />
        )}
      </Modal.Body>
      <Modal.Footer className='mx-auto'>
        <Button
          variant='secondary'
          onClick={() => props.setIsModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={props.buttonAction}
          disabled={props.disabledButton}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}