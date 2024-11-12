import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ isOpen, onClose, className, children, }) => {
    if (!isOpen) return null;

    // height = "auto", width = "400px"

    return ReactDOM.createPortal(

        <div className={` fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 `}>
            <div
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg"
            // style={{ width, height }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 dark:text-gray-300"
                >
                    ✖
                </button>

                {/* Modal Content */}
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    );
};

// export default Modal;
