import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import React from 'react';




const notify = (mes) => toast.success(mes, {
    autoClose: 5000,
    draggable: true,
    position: "top-center",
});

const NotifyIndicator = (message, link) => {
    notify(
        '✉️ ' + message
    );
}



export default NotifyIndicator;