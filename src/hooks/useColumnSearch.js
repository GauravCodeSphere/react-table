import { useState } from 'react';
import { getColumnValue } from '../utils/material';

export const useColumnSearch = (originalProducts) => {
    const [columnSearchTerms, setColumnSearchTerms] = useState({});

    const handleColumnSearchChange = (column, value) => {
        setColumnSearchTerms((prevSearchTerms) => ({
            ...prevSearchTerms,
            [column]: value,
        }));
    };

    const getFilteredProductsByColumn = () => {
        let filteredProducts = [...originalProducts];

        // Apply column-specific search filters
        Object.entries(columnSearchTerms).forEach(([column, searchValue]) => {
            if (searchValue) {
                filteredProducts = filteredProducts.filter((product) =>
                    String(product[getColumnValue(column)]).toLowerCase().includes(searchValue.toLowerCase())
                );
            }
        });

        return filteredProducts;
    };

    return { columnSearchTerms, handleColumnSearchChange, getFilteredProductsByColumn };
};


