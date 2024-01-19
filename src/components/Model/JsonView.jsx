import { useState } from "react";
import { buttonStyles } from "../../utils/material";

const JsonView = ({ productData }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen ? (
                <div
                    id="default-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-[#00000078]"
                >
                    <div className="relative p-4 w-full max-w-2xl">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-h-screen">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    JSON View
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                                <pre>{JSON.stringify(productData, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    className={buttonStyles}
                    style={{ background: "#0ea5e9", color: "white" }}
                    onClick={() => setIsOpen(true)}
                >
                    JSON View
                </button>
            )}
        </>
    );
};

export default JsonView;
