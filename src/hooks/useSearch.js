import { useState } from 'react';

export const useSearch = (handlePageChange) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
        handlePageChange(1); // Reset to the first page when performing a new search
    };

    return { searchTerm, handleSearch };
};

