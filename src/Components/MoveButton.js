import { Button } from 'react-bootstrap';

import {
  FaRegHandRock,
  FaRegHandPaper,
  FaRegHandScissors
} from 'react-icons/fa';

export default function MoveButton(props) {
  return (
    <div>
      <Button
        variant='outline-primary'
        type='button'
        className='w-100'
        size='lg'
        disabled={props.disabled}
        onClick={() => { props.handleMove(props.moveType) }}
      >
        {(props.moveType) === 'ROCK' && <FaRegHandRock />}
        {(props.moveType) === 'PAPER' && <FaRegHandPaper />}
        {(props.moveType) === 'SCISSORS' && <FaRegHandScissors />}

        <span className='ps-2'>{props.moveType}</span>
      </Button>
    </div>
  );
}