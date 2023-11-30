import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' | 'default'
) => {
  toast(message, {
    position: 'top-right',
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    type: type,
    progress: undefined,
  });
};
