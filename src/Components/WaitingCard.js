import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaCopy, FaShareAlt } from 'react-icons/fa';

export default function WaitingCard(props) {
  const [copiedVisible, setCopiedVisible] = useState(false);

  const code = props.roomCode;
  const text = `Room code for Rock Paper Scissors - Online is ${code}`;
  const url = 'https://rps-online-game.vercel.app/lobby';
  const copiedTooltip = <Tooltip>Copied</Tooltip>;

  //#region Local functions / Funções locais
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Share Room Code',
        text: text,
        url: url,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Share action is not supported in this browser.');
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`${text} - ${url}`)
      .then(() => console.log('Copied successfully'))
      .catch((error) => console.error('Error copying', error));
  }

  const handleCopyButtonClick = () => {
    handleCopyToClipboard();
    setCopiedVisible(true);
    setTimeout(() => setCopiedVisible(false), 2000);
  };
  //#endregion

  return (
    <main className='w-100 overflow-auto mx-auto mt-5 mb-4 px-3 py-1'>
      <div className='col col-md-9 col-lg-6 mx-auto'>
        <div className='card text-center'>
          <div className='card-header fw-bold'>
            Waiting for an opponent...
          </div>

          <div className='card-body'>
            Please note your session will expire in 3
            minutes if an opponent doesn't join the game.
          </div>

          <OverlayTrigger
            placement='top'
            overlay={copiedTooltip}
            show={copiedVisible}
          >
            <Button
              variant='outline-info'
              onClick={handleCopyButtonClick}
              className='mx-3 mb-2'
              size='sm'
            >
              <FaCopy /> COPY ROOM CODE
            </Button>
          </OverlayTrigger>

          <Button
            variant='outline-info'
            onClick={handleShare}
            className='mx-3 mb-2'
            size='sm'
          >
            <FaShareAlt /> SHARE ROOM CODE
          </Button>
        </div>
      </div>
    </main>
  );
}