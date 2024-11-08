import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TruckMoveForwordIcon from "../../images/loading/forword_move_truck.gif";


const MySwal = withReactContent(Swal);

const TrukLoaderMoveForword = (loadingMessage) => {
    console.log("message", loadingMessage)
    const messageText = typeof loadingMessage === 'string' ? loadingMessage : "Processing...";

    MySwal.fire({
        title: messageText,
        html: `
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <img src="${TruckMoveForwordIcon}" alt="Loading..." style="width: 50px; height: 50px;"/>
                <p style="margin-top: 10px;">${"Please wait, the process is ongoing..."}</p>
            </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
    });
};


// Custom error dialog
const TrukErrorDialog = (message, htmlContent) => {
    MySwal.fire({
        icon: 'error',
        title: 'Error',
        html: htmlContent || message || "An unexpected error occurred.",

        coconfirmButtonText: 'Close',
        // confirmButtonColor: '#3085d6', // Customize the button color
        showConfirmButton: true,
        allowOutsideClick: false,
        customClass: {
            confirmButton: 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition ease-in-out duration-150',
        },
        showConfirmButton: true,
        allowOutsideClick: false,
    });
};

const TrukProcessDialog = (title, message, htmlContent) => {
    MySwal.fire({
        icon: 'success',  // Display a success icon
        title: title || "Success!",
        html: htmlContent || message || "Your request was successfully processed.",
        confirmButtonText: 'Close',
        showConfirmButton: true,
        allowOutsideClick: false,
        customClass: {
            confirmButton: 'bg-green-500 block text-white py-2 px-4 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition ease-in-out duration-150',
        },
    });
};


export {
    TrukLoaderMoveForword,
    TrukErrorDialog,
    TrukProcessDialog
};
