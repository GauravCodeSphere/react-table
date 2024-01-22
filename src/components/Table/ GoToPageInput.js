import React, { useState } from 'react';

const GoToPageInput = ({ totalPages, onPageChange }) => {
    const [pageNumber, setPageNumber] = useState('');

    const handleInputChange = (event) => {
        const inputNumber = parseInt(event.target.value, 10);
        setPageNumber(isNaN(inputNumber) ? '' : inputNumber);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <label htmlFor="pageNumber" className="sr-only">
                Go to Page:
            </label>
            <input
                type="text"
                id="pageNumber"
                value={pageNumber}
                onChange={handleInputChange}
                placeholder={`Go to Page (1-${totalPages})`}
                pattern="\d*"
                inputMode="numeric"
                className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
            />

            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Go
            </button>
        </form>
    );
};

export default GoToPageInput;
