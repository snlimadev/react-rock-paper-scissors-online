import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from '../Pages/Home';
import Singleplayer from '../Pages/Singleplayer';
import Lobby from '../Pages/Lobby';
import Multiplayer from '../Pages/Multiplayer';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/singleplayer' element={<Singleplayer />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/multiplayer' element={<Multiplayer />} />
      </Routes>
    </BrowserRouter>
  );
}