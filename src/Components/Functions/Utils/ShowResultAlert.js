import { customSwal } from './CustomSwal';

//#region Function to show game result
// Função para exibir o resultado do jogo
export function showResultAlert(icon, title, text) {
  customSwal.fire({
    icon: icon,
    title: title,
    text: text,
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}
//#endregion