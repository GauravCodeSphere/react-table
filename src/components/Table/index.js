import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import SearchForm from './SearchForm';
import TableActions from './TableActions';
import ProductItem from './ProductItem';
import LoadingTable from './LoadingTable';
import PaginationModel from './Pagination';
import JsonView from '../Model/JsonView';
import { ExportCSVButton } from '../../hooks/ExportCSVButton';
import { actions, buttonStyles, columnLabels } from '../../utils/material';

// import custom hooks 
import { useFilteredAndSortedProducts, useSorting, useSearch, useFieldCount, usePagination, useColumnVisibility, useColumnSearch, useUndo, useSmoothScrolling, useColorManagement } from '../../hooks';
import { useActions } from '../../store/actions';
import ColorChange from './ColorChange';

const ProductTable = ({ products, loading, error }) => {

    const { deleteMultiProduct } = useActions()
    const { rowColors, addColor, removeColor } = useColorManagement()
    const { containerRef, startScrolling, stopScrolling } = useSmoothScrolling();
    const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, startIndex, endIndex } = usePagination(10)
    const { selectedColumns, handleColumnChange, setSelectedColumns } = useColumnVisibility();
    const { searchTerm, handleSearch } = useSearch(handlePageChange);
    const { sortColumn, sortOrder, handleSort, resetSorting } = useSorting();

    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const { filteredProductsByBrand } = useFilteredAndSortedProducts(products, searchTerm, sortColumn, sortOrder, selectedBrand, 'brand');
    const filterOptions = useFieldCount(products, 'brand', 1);

    const { columnSearchTerms, handleColumnSearchChange, getFilteredProductsByColumn } = useColumnSearch(filteredProductsByBrand);

    const toggleExpanded = (index) => {
        setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleCheckboxChange = (itemId) => {
        const isSelected = selectedItems.includes(itemId);

        if (isSelected) {
            setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
        } else {
            setSelectedItems((prevSelected) => [...prevSelected, itemId]);
        }
    };

    const handleDelete = () => {
        if (selectedItems.length === 0) return alert("No selected item found")
        deleteMultiProduct(selectedItems);
        setSelectedItems([])
    };



    // Function to toggle the presence of a brand in the selectedBrand array
    const toggleBrand = (brand) => {
        setSelectedBrand(prevSelectedBrand => {
            const brandIndex = prevSelectedBrand.indexOf(brand);
            if (brandIndex === -1) {
                return [...prevSelectedBrand, brand];
            } else {
                return prevSelectedBrand.filter(b => b !== brand);
            }
        });
    };

    const getColumnHeaderLabel = (column) => {
        return columnLabels[column] || column;
    };

    const handleColumnSearch = (event, column) => {
        const value = event.target.value;
        handleColumnSearchChange(column, value);
        handlePageChange(1);
    };
    const handleReset = (column) => {
        handleColumnSearchChange(column, ''); // Clear the search term for the specified column
        handlePageChange(1);
    };


    return (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 h-screen ">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-lg sm:rounded-lg overflow-hidden">

                    <div className="flex flex-wrap justify-between mt-3 gap-3 p-4">
                        <div >

                            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                <button
                                    className="text-sky-500 text-lg px-4 py-2 border rounded hover:bg-slate-50"
                                    onMouseDown={() => startScrolling(-1)}
                                    onMouseUp={stopScrolling}
                                    onMouseLeave={stopScrolling}
                                >
                                    <IoMdArrowDropleftCircle />
                                </button>
                                <button
                                    className="text-sky-500 text-lg px-4 py-2 border rounded hover:bg-slate-50"
                                    onMouseDown={() => startScrolling(1)}
                                    onMouseUp={stopScrolling}
                                    onMouseLeave={stopScrolling}
                                >
                                    <IoMdArrowDroprightCircle />
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2'>

                            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                <JsonView productData={filteredProductsByBrand} />
                            </div>

                            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                <ExportCSVButton data={filteredProductsByBrand} filename="table_data" />
                            </div>

                            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                <ColorChange selectedItems={selectedItems} setSelectedItems={setSelectedItems} addColor={addColor} removeColor={removeColor} />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <SearchForm onSearch={handleSearch} />

                        {sortColumn === null || (
                            <div className="mb-2 md:mb-0">
                                <button className={buttonStyles} onClick={resetSorting}>
                                    Clear sort
                                </button>
                            </div>
                        )}

                        <div className="mb-2 md:mb-0">
                            <TableActions
                                actions={actions}
                                filterOptions={filterOptions}
                                setSelectedBrand={toggleBrand}
                                selectedColumns={selectedColumns}
                                onColumnChange={handleColumnChange}
                                handleDelete={handleDelete}
                                setSelectedColumns={setSelectedColumns}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto" ref={containerRef}>
                        {selectedItems.length > 0 &&
                            <div className='bg-sky-500 text-white ps-3 px-2 font-semibold'>
                                Selected Items: {selectedItems.length}
                            </div>}
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th></th>
                                    {[...selectedColumns.keys()].map((column, index) => (
                                        <th key={index} scope="col" className={`px-4 py-3 ${sortColumn === column ? 'sorted-column' : ''}`}>
                                            <div className="flex flex-col">
                                                <div className='relative'>
                                                    <input
                                                        type="text"
                                                        placeholder={`Search ${getColumnHeaderLabel(column)}`}
                                                        value={columnSearchTerms[column] || ''}
                                                        onChange={(event) => handleColumnSearch(event, column)}
                                                        className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                                                        onClick={() => handleReset(column)}
                                                    >
                                                        <svg
                                                            className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer"
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
                                                </div>

                                                <div className="flex justify-start items-center mt-2" onClick={() => handleSort(column)}>
                                                    {getColumnHeaderLabel(column)}
                                                    <span className="ml-1">
                                                        {sortColumn === column ? (
                                                            sortOrder === 'asc' ? (
                                                                <FaSortUp className="mt-1" />
                                                            ) : (
                                                                <FaSortDown className="mb-1" />
                                                            )
                                                        ) : (
                                                            <FaSort />
                                                        )}
                                                    </span>
                                                </div>
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
                                    {getFilteredProductsByColumn().slice(startIndex, endIndex).map((product, index) => (
                                        <ProductItem
                                            selectedColumns={selectedColumns}
                                            product={product}
                                            key={index}
                                            rowIndex={index}
                                            handleCheckboxChange={handleCheckboxChange}
                                            selectedItems={selectedItems}
                                            expanded={index === expandedRowIndex}
                                            toggleExpanded={() => toggleExpanded(index)}
                                            rowColors={rowColors}
                                        />
                                    ))}
                                </tbody>}
                        </table>
                    </div>
                    <PaginationModel
                        totalItems={getFilteredProductsByColumn().length}
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
