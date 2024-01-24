import { useState, useEffect, useMemo } from 'react';
import { getColumnValue } from '../utils/material';

export const useFilteredAndSortedProducts = (originalProducts, searchTerm, sortColumn, sortOrder, selectedBrand, field) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredProductsByBrand, setFilteredProductsByBrand] = useState([]);

    const memoizedGetColumnValue = useMemo(() => getColumnValue, []); // Memoizing getColumnValue

    useEffect(() => {
        // Filtering and sorting logic combined
        const sorted = originalProducts
            .filter(product => Object.values(product).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())))
            .sort((a, b) => {
                const columnValueA = a[memoizedGetColumnValue(sortColumn)];
                const columnValueB = b[memoizedGetColumnValue(sortColumn)];

                const valueA = memoizedGetColumnValue(sortColumn) === 'price' ? columnValueA || 0 : columnValueA || '';
                const valueB = memoizedGetColumnValue(sortColumn) === 'price' ? columnValueB || 0 : columnValueB || '';

                return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
            });

        setFilteredProducts(sorted);

        // Filtering by brand logic
        const filteredByBrand = Array.isArray(selectedBrand) && selectedBrand.length
            ? sorted.filter(product => selectedBrand.includes(product[field]))
            : sorted;

        setFilteredProductsByBrand(filteredByBrand);
    }, [originalProducts, searchTerm, sortColumn, sortOrder, selectedBrand, field, memoizedGetColumnValue]);

    return {
        filteredProducts,
        filteredProductsByBrand,
    };
};
