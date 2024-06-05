import { toast } from 'react-toastify';

const notifySuccess = (message: string) =>
    toast.success(message, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

const notifyError = (message: string) =>
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
const notifyWarn = (message: string) =>
    toast.warn(message, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
const notifyInfo = (message: string) =>
    toast.info(message, {
        position: 'bottom-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export { notifySuccess, notifyError, notifyWarn, notifyInfo };
