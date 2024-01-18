import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        // onSearch(event.target.value);

    };

    const handleReset = () => {
        setSearchTerm('');
        onSearch("");

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
        // console.log('Search Term:', searchTerm);
    };

    return (
        <div className="w-full md:w-1/2">
            <form className="flex items-center" onSubmit={handleSubmit}>
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        required=""
                        autoComplete='off'
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                            onClick={handleReset}
                        >
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:border-primary-400"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
