import { useState } from 'react';

const useSorting = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const resetSorting = () => {
        setSortColumn(null);
        setSortOrder('asc');
    };

    return { sortColumn, sortOrder, handleSort, resetSorting };
};

export default useSorting;