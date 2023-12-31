import { useState } from 'react';

import MoveButton from './MoveButton';

export default function Game(props) {
  const [move, setMove] = useState('');

  return (
    <main
      className='col col-md-9 col-lg-6 mx-auto px-3 py-5
        h-100 d-flex flex-column justify-content-center'
    >
      <div className='card fs-5 fw-bold text-center mt-4 mb-2'>
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

      <>
        {(props.disabledButtons) ? (
          <div className='pt-1 text-center'>
            <div>You chose {move}.</div>
            <div>Waiting for opponent's choice...</div>
          </div>
        ) : (
          <></>
        )}
      </>

      <div className='pt-3'>
        <MoveButton
          moveType='ROCK'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </div>

      <div className='pt-3'>
        <MoveButton
          moveType='PAPER'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </div>

      <div className='pt-3 pb-4'>
        <MoveButton
          moveType='SCISSORS'
          setMoveType={setMove}
          handleMove={props.handleMove}
          disabled={props.disabledButtons}
        />
      </div>
    </main>
  );
}