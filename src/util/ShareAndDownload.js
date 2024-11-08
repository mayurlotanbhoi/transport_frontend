import React from 'react';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Function to capture and share the details
export const handleShare = async (id, name, text) => {
    const shareContent = document.getElementById(id);

    const canvas = await html2canvas(shareContent, { backgroundColor: null, useCORS: true });

    canvas.toBlob(async (blob) => {
        const file = new File([blob], 'truck_info.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: name,
                    text: text,
                });
            } catch (error) {
                console.error('Error sharing:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Sharing Error',
                    text: 'Unable to share the details!',
                });
            }
        } else {
            MySwal.fire({
                icon: 'info',
                title: 'Sharing Not Supported',
                text: 'Your device does not support sharing.',
            });
        }
    });
};

// Function to capture and download the details
export const handleDownload = async (id) => {
    const downloadContent = document.getElementById(id);

    if (!downloadContent) {
        MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Content to download not found!',
        });
        return;
    }

    try {
        const canvas = await html2canvas(downloadContent, { backgroundColor: null, useCORS: true });
        const link = document.createElement('a');
        link.download = 'downloaded_image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Error downloading:', error);
        MySwal.fire({
            icon: 'error',
            title: 'Download Error',
            text: 'Unable to download the details!',
        });
    }
};
