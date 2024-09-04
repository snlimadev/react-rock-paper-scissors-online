import Swal from 'sweetalert2';

export const customSwal = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-primary"
  },
  buttonsStyling: false,
  background: 'var(--bs-body-bg)',
  color: 'var(--bs-body-color)'
});