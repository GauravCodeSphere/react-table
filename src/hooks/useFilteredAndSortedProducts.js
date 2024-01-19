import { useState, useEffect } from 'react';
import { getColumnValue } from '../utils/material';

export const useFilteredAndSortedProducts = (originalProducts, searchTerm, sortColumn, sortOrder, selectedBrand,field) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [filteredProductsByBrand, setFilteredProductsByBrand] = useState([]);

    useEffect(() => {
        // Filtering logic
        const filtered = originalProducts.filter(product =>
            Object.values(product).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredProducts(filtered);

        // Sorting logic
        const sorted = [...filtered].sort((a, b) => {
            const columnValueA = a[getColumnValue(sortColumn)];
            const columnValueB = b[getColumnValue(sortColumn)];

            let valueA, valueB;

            if (getColumnValue(sortColumn) === 'price') {
                valueA = columnValueA || 0;
                valueB = columnValueB || 0;
            } else {
                valueA = columnValueA || '';
                valueB = columnValueB || '';
            }

            if (sortOrder === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });
        setSortedProducts(sorted);

        // Filtering by brand logic
        const filteredByBrand = selectedBrand && selectedBrand.length
            ? sorted.filter(product => selectedBrand.includes(product[field]))
            : sorted;
        setFilteredProductsByBrand(filteredByBrand);
    }, [originalProducts, searchTerm, sortColumn, sortOrder, selectedBrand]);

    return {
        filteredProducts,
        sortedProducts,
        filteredProductsByBrand,
    };
};

