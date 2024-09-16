import { ReadyState } from 'react-use-websocket';
import Swal from 'sweetalert2';
import { customSwal } from '../Utils';

//#region Function to handle client connection
// Função para lidar com a conexão do cliente
export function handleClientConnection(
  serverCalled,
  setServerCalled,
  readyState,
  navigate
) {
  if (!serverCalled) {
    customSwal.fire({
      title: 'Connecting...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setServerCalled(true);
    return false;
  } else {
    if (readyState === ReadyState.OPEN) {
      Swal.close();
      return true;
    } else {
      customSwal.fire({
        icon: 'error',
        text: 'Connection to the server lost or expired. ' +
          'Please check your internet connection and try again later.'
      });

      navigate('/');
      return false;
    }
  }
}
//#endregion