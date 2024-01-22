
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../store/actions';

const SearchSuggestionsComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const { fetchProducts } = useActions();
    const myData = useSelector((state) => state.product.products);

    useEffect(() => {
        fetchProducts();
    }, []);

    const highlightMatch = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} className="font-bold text-blue-500">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    const handleSearch = (searchTerm) => {
        setLoading(true);

        const filteredSuggestions = myData
            .filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5);

        setSearchSuggestions(filteredSuggestions);
        setLoading(false);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion.title);
        setSearchSuggestions([]);
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchSuggestions([]);
    };

    const handleBlur = () => {
        // Delay hiding suggestions to allow clicking on suggestions
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    return (
        <div className="relative inline-block text-left">
            <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    handleSearch(value);
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />

            {searchTerm && (
                <button
                    className="absolute right-0 mr-2 py-1 px-2 text-gray-500 hover:text-gray-700"
                    onClick={handleClear}
                >
                    Clear
                </button>
            )}

            {showSuggestions && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {loading && <div className="py-2 px-4 text-gray-500">Loading...</div>}
                    {!loading && searchSuggestions.length > 0 && (
                        <ul className="py-2 px-4">
                            {searchSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="cursor-pointer hover:bg-gray-100 flex items-center mb-4"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion.thumbnail && (
                                        <img
                                            src={suggestion.thumbnail}
                                            alt={suggestion.title}
                                            className="mr-2 w-8 h-8 object-cover rounded"
                                        />
                                    )}
                                    <span>{highlightMatch(suggestion.title, searchTerm)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchSuggestionsComponent;
