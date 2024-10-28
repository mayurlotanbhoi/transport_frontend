import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);

const showSuccessAlert = (message, logo) => {
    MySwal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: <button className=' dark:bg-blue-700 text-white bg-primary font-bold btn'>Ok</button>,
    });
};
const showErrorAlert = (message, logo) => {
    MySwal.fire({
        html: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '3em', color: 'green', marginBottom: '20px' }}>❌</div>
                <p>{message}</p>
            </div>
        ),
        showConfirmButton: true, // Show confirm button if needed
        customClass: {
            popup: 'my-custom-popup', // Custom class for further styling if needed
        },
    });
};
const showImgInSwal = (text, img) => {
    MySwal.fire({
        html: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* <div style={{ fontSize: '3em', color: 'green', marginBottom: '20px' }}>✔️</div> */}
                <p>{text}</p>
            </div>
        ),
        showConfirmButton: true, // Show confirm button if needed
        customClass: {
            popup: 'my-custom-popup', // Custom class for further styling if needed
        },
    });
}
export {
    showSuccessAlert,
    showErrorAlert,
    showImgInSwal
}