import React, { useState } from 'react';
import { AiFillFileExcel, AiFillFilePdf, AiOutlineLoading3Quarters, AiOutlineDownload } from 'react-icons/ai';
import { getToken } from './localStorage';
import { FaFilePdf } from 'react-icons/fa';

const DownloadButton = ({ fileType, endpoint, buttonLabel }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Determine icon based on file type
    const fileIcon = fileType === 'excel' ? <AiFillFileExcel className="mr-2" /> : <FaFilePdf className="mr-2" />;

    const handleDownload = async () => {
        setIsLoading(true);
        setError(null);
        const token = getToken()

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include', // Send cookies with the request, if needed
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${buttonLabel}.${fileType === 'excel' ? 'xlsx' : fileType}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            console.log("Download initiated successfully");
        } catch (err) {
            setError(`Download failed: ${err.message}`);
            console.error("Error downloading file:", err);
        } finally {
            setIsLoading(false);
        }
    };



    // Define an async function inside useEffect to handle async/await
    // const handleDownload = async () => {
    //     const token = getToken()
    //     setDownloading(true)
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/trips/downloadExelFormatAllTripHistories/${format}`, {
    //             method: 'GET',
    //             credentials: 'include', // Ensure cookies are senthe
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //         const blob = await response.blob();
    //         // Create a download link for the file immediately
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', `trip_history.${format === 'excel' ? 'xlsx' : 'pdf'}`);
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //         console.log("Download initiated successfully");
    //     } catch (error) {
    //         console.error("Error downloading file:", error);
    //     } finally {
    //         setFormat(null)
    //         setDownloading(false)
    //     }
    // };



    return (
        <div className="">
            <button
                onClick={handleDownload}
                className={`flex items-center justify-center px-4 py-2 rounded-md text-white transition-transform duration-150 ${fileType === 'excel' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <div className=' flex  items-center'>
                            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                            <span>{buttonLabel}</span>
                        </div>
                    </>
                ) : (
                    <>
                        {fileIcon}
                        <span>{buttonLabel}</span>
                    </>
                )}
            </button>

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>
    );
};

export default DownloadButton;
