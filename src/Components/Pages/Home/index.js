/* eslint-disable */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiUser, PiUsers } from 'react-icons/pi';

import Header from '../../Header';
import Footer from '../../Footer';

import {
  useGameParameters
} from '../../../Contexts/GameParametersContext';

export default function Home() {
  const { setGameParameters } = useGameParameters();

  useEffect(() => {
    setGameParameters('', '', 0);
  }, []);

  return (
    <div className='vh-100 d-flex flex-column justify-content-center'>
      <Header
        title='Home'
        icon='hidden'
        route='/'
      />

      <main className='w-100 overflow-auto mx-auto mt-5 mb-4 text-center px-3 py-1'>
        <h3>Welcome to Rock Paper Scissors - Online!</h3>

        <h5 className='pt-2'>
          Play against the computer (singleplayer)
          or online with a friend (multiplayer)!
        </h5>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3'>
          <Link to='/singleplayer' className='btn btn-primary w-100'>
            <PiUser /> SINGLEPLAYER
          </Link>
        </div>

        <div className='col col-md-9 col-lg-6 mx-auto pt-3'>
          <Link to='/lobby' className='btn btn-primary w-100'>
            <PiUsers /> MULTIPLAYER
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}