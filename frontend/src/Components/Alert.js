import React, { useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Alert(props) {



    const notify = useCallback(() => {
        const { typ, msg } = props.showalert;

        switch (typ) {
            case 'success':
                toast.success(msg, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
            case 'error':
                toast.error(msg, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;

            case 'info':
                toast.info(msg, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
            case 'warning':
                toast.warn(msg, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
            default:
                toast(msg, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
        }
    }, [props.showalert]);



    useEffect(() => {
        if (props.showalert) {
            notify();
        }
    }, [props.showalert, notify]);


    return (
        <div>
            <ToastContainer />
        </div>
    )
}


export default Alert
