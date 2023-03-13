import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const StoreSwal = Swal.mixin({});
const MySwal = withReactContent(StoreSwal);

export const triggerError = (error: string, title = 'Error!') => {
  return MySwal.fire({
    title: title,
    text: error,
    icon: 'error',
  });
};

export const triggerLoading = (loading: string, title = 'Cargando...') => {
  return MySwal.fire({
    title: title,
    text: loading,
    icon: 'info',
  });
};

export const triggerSuccess = (success: string, title = 'Todo correcto!') => {
  return MySwal.fire({
    title: title,
    text: success,
    icon: 'success',
  });
};

export const triggerWarning = (warning: string, title = 'Alerta!') => {
  return MySwal.fire({
    title: title,
    text: warning,
    icon: 'warning',
  });
};

export const triggerConfirm = async (confirm: string, title = 'Confirmar!') => {
  return await MySwal.fire({
    title: title,
    text: confirm,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  });
};

export const triggerRequest = async (request: string, title = 'Petición!') => {
  return MySwal.fire({
    title: title,
    input: 'text',
    inputLabel: request,
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: 'Entiendo y acepto',
    confirmButtonColor: '#ef4444',
  });
};

export default MySwal;
