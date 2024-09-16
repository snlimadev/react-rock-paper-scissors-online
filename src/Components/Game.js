import { useState } from 'react';

import MoveButton from './MoveButton';

const MOVE_TYPES = ['ROCK', 'PAPER', 'SCISSORS'];

export default function Game(props) {
  const [move, setMove] = useState('');

  return (
    <main className='w-100 overflow-auto mx-auto mt-5 mb-4 px-3 py-1'>
      <div className='col col-md-9 col-lg-6 mx-auto'>
        <div className='card fs-5 fw-bold text-center mb-2'>
          <div className='card-header'>SCORE</div>

          <div className='card-body'>
            <span className='text-success pe-2'>{props.player1Text}</span>
            <span className='fs-3 pe-2'>{props.player1Score}</span>
            x
            <span className='fs-3 ps-2'>{props.player2Score}</span>
            <span className='text-danger ps-2'>{props.player2Text}</span>

            <div className='pt-2'>
              <span className='fs-3 pe-2'>{props.drawCounter}</span>
              <span className='text-warning'>DRAWS</span>
            </div>
          </div>
        </div>

        {(props.disabledButtons) ? (
          <div className='pt-1 text-center'>
            <div>You chose {move}.</div>
            <div>Waiting for opponent's choice...</div>
          </div>
        ) : (
          <></>
        )}

        {MOVE_TYPES.map((type, index) => (
          <div className='pt-3'>
            <MoveButton
              key={index}
              moveType={type}
              setMoveType={setMove}
              handleMove={props.handleMove}
              disabled={props.disabledButtons}
            />
          </div>
        ))}
      </div>
    </main>
  );
}