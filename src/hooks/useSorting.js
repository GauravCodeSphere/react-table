import { useState } from 'react';

export const useSorting = () => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortby = (column, sortOrder) => {
        console.log("hello");
        setSortColumn(column);
        setSortOrder(sortOrder);
    }


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

    function disabledSortOption(column, order) {
        if (sortColumn === column && sortOrder === order) {
            return true
        } else {
            return false
        }
    }

    return { sortColumn, sortOrder, handleSort, resetSorting, handleSortby, disabledSortOption };
};
