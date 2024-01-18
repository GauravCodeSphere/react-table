import React, { useState } from 'react';
import SearchForm from './SearchForm';
import TableActions from './TableActions';
import ProductItem from './ProductItem';
import { actions, brands, buttonStyles, columnLabels } from '../../utils/material';
import { connect } from 'react-redux';
import LoadingTable from './LoadingTable';
import PaginationModel from './Pagination';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ProductTable = ({ products, loading, error }) => {

    const initialColumnVisibility = new Map([
        ['productName', true],
        ['category', true],
        ['brand', true],
        ['description', true],
        ['price', true]
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
    const [selectedColumns, setSelectedColumns] = useState(initialColumnVisibility);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedBrand, setSelectedBrand] = useState([]);

    // Function to toggle the presence of a brand in the selectedBrand array
    const toggleBrand = (brand) => {
        setSelectedBrand(prevSelectedBrand => {
            // Check if the brand is already in the array
            const brandIndex = prevSelectedBrand.indexOf(brand);

            // If the brand is not in the array, add it; otherwise, remove it
            if (brandIndex === -1) {
                return [...prevSelectedBrand, brand];
            } else {
                return prevSelectedBrand.filter(b => b !== brand);
            }
        });
    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            // Toggle sort order if clicking on the same column
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort column and default to ascending order
            setSortColumn(column);
            setSortOrder('asc');
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    const filteredProducts = products.filter(product =>
        Object.values(product).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const getColumnValue = (column) => {
        switch (column) {
            case 'productName':
                return "title";
            case 'category':
                return "category";
            case 'brand':
                return "brand";
            case 'description':
                return "description";
            case 'price':
                return "price";
            default:
                return '';
        }
    };




    // Sorting logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
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

    const filteredProductsByBrand = selectedBrand && selectedBrand.length
        ? sortedProducts.filter(product => selectedBrand.includes(product.brand))
        : sortedProducts;


    // console.log(filteredProductsByBrand);
    // Function to reset sorting
    const resetSorting = () => {
        setSortColumn('');
        setSortOrder('asc');
    };


    const handleColumnChange = (selectedColumn) => {
        setSelectedColumns((prevVisibility) => {
            const newVisibility = new Map(prevVisibility);
            newVisibility.set(selectedColumn, !prevVisibility.get(selectedColumn));
            return newVisibility;
        });
    };

    const getColumnHeaderLabel = (column) => {
        return columnLabels[column] || column;
    };



    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to the first page when performing a new search
    };



    // Create a map to count occurrences of each brand
    const brandCountMap = new Map();
    products.forEach(product => {
        const brand = product.brand;
        brandCountMap.set(brand, (brandCountMap.get(brand) || 0) + 1);
    });

    // Extract unique brands with counts
    const uniqueBrands = [...new Set(products.map(product => product.brand))]
        .map(brand => ({
            id: brand.toLowerCase(),
            label: brand,
            count: brandCountMap.get(brand)
        }))
        .filter(brand => brand.count > 1);



    return (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 h-screen mt-10">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* Start coding here */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <SearchForm onSearch={handleSearch} />
                        {sortColumn === "" || <button className={buttonStyles} onClick={resetSorting}>Clear sort</button>}
                        <TableActions
                            actions={actions}
                            brands={uniqueBrands}
                            setSelectedBrand={toggleBrand}
                            selectedColumns={selectedColumns}
                            onColumnChange={handleColumnChange}

                        />

                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {[...selectedColumns.keys()]
                                        .filter(column => selectedColumns.get(column))
                                        .map((column, index) => (
                                            <th key={index} scope="col" className="px-4 py-3" onClick={() => handleSort(column)}>
                                                <div className='flex justify-center items-center'>

                                                    {getColumnHeaderLabel(column)}
                                                    {sortColumn === column && (
                                                        <span className="ml-1">{sortOrder === 'asc' ? <FaSortUp className='mt-1' /> : <FaSortDown className='mb-1' />}</span>
                                                    ) ||
                                                        <span className="ml-1"><FaSort /></span>
                                                    }
                                                </div>
                                            </th>
                                        ))}
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            {loading ?
                                <LoadingTable numRows={10} numCols={5} />
                                :
                                <tbody>
                                    {filteredProductsByBrand.slice(startIndex, endIndex).map((product, index) => (
                                        <ProductItem
                                            selectedColumns={selectedColumns}
                                            product={product}
                                            key={index}
                                        />
                                    ))}
                                </tbody>}
                        </table>
                    </div>
                    <PaginationModel
                        totalItems={filteredProductsByBrand.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            </div>
        </section>

    );
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        loading: state.product.loading,
        error: state.product.error,
    };
};

export default connect(mapStateToProps)(ProductTable);
