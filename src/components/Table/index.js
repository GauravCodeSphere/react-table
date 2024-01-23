import React, { useState } from 'react';
import { connect } from 'react-redux';
import ColumnResize from "react-table-column-resizer";
import { BiSortAlt2 } from "react-icons/bi";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import SearchForm from './SearchForm';
import TableActions from './TableActions';
import ProductItem from './ProductItem';
import LoadingTable from './LoadingTable';
import PaginationModel from './Pagination';
import { actions, columnLabels } from '../../utils/material';
// import custom hooks 
import { useFilteredAndSortedProducts, useSorting, useSearch, useFieldCount, usePagination, useColumnVisibility, useColumnSearch, useSmoothScrolling, useColorManagement, useSelectItems } from '../../hooks';
import ColumnDropDown from './ColumnDropDown';
import TableFeatures from './TableFeatures';


const ProductTable = ({ products, loading, error }) => {

    // custom hooks
    const { rowColors, addColor, removeColor } = useColorManagement()
    const { containerRef, startScrolling, stopScrolling } = useSmoothScrolling();
    const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, startIndex, endIndex } = usePagination(10)
    const { selectedColumns, handleColumnChange, setSelectedColumns, showAllColumn, visibleColumnsArray } = useColumnVisibility();
    const { searchTerm, handleSearch } = useSearch(handlePageChange);
    const { sortColumn, sortOrder, handleSort, resetSorting, handleSortby, disabledSortOption } = useSorting();

    // useState
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    // custom hooks
    const { filteredProductsByBrand } = useFilteredAndSortedProducts(products, searchTerm, sortColumn, sortOrder, selectedBrand, 'category');
    const filterOptions = useFieldCount(products, 'category', 1);
    const { columnSearchTerms, handleColumnSearchChange, getFilteredProductsByColumn } = useColumnSearch(filteredProductsByBrand);
    const { selectedItems, selectAllChecked, setSelectedItems, handleCheckboxChange, handleDelete, handleSelectAllChange } = useSelectItems(getFilteredProductsByColumn)

    const toggleExpanded = (index) => {
        setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
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

                    <TableFeatures
                        filteredProductsByBrand={filteredProductsByBrand}
                        selectedItems={selectedItems}
                        setShowFilter={setShowFilter}
                        setSelectedItems={setSelectedItems}
                        showFilter={showFilter}
                        addColor={addColor}
                        removeColor={removeColor}
                        startScrolling={startScrolling}
                        stopScrolling={stopScrolling}
                    />

                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <SearchForm onSearch={handleSearch} />
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
                            </div>
                        }
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className='px-4 py-3 ms-3 flex justify-center mt-2'>
                                        <input
                                            type="checkbox"
                                            checked={selectAllChecked}
                                            onChange={() => handleSelectAllChange()}
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                    </th>

                                    {visibleColumnsArray.map((column, index) => (
                                        <>
                                            <th key={index} scope="col" className={`px-4 py-3 ${sortColumn === column ? 'sorted-column' : ''}`}>
                                                <div className="flex flex-col">
                                                    {showFilter &&
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
                                                        </div>}

                                                    <div className="flex justify-start items-center mt-2" >
                                                        {getColumnHeaderLabel(column)}
                                                        <span className="ml-1" onClick={() => handleSort(column)}>
                                                            {sortColumn === column ? (
                                                                sortOrder === 'asc' ? (
                                                                    <FaArrowUpLong />
                                                                ) : (
                                                                    <FaArrowDownLong />
                                                                )
                                                            ) : (
                                                                <BiSortAlt2 />
                                                            )}
                                                        </span>
                                                        <span className='ml-1'>
                                                            <ColumnDropDown
                                                                column={column}
                                                                resetSorting={resetSorting}
                                                                handleSortby={handleSortby}
                                                                clearFilter={() => handleReset(column)}
                                                                showFilter={() => setShowFilter(true)}
                                                                handleColumnChange={() => handleColumnChange(column)}
                                                                showAllColumn={showAllColumn}
                                                                clearSortState={sortColumn === null}
                                                                disabledSortOption={disabledSortOption}
                                                                filterState={showFilter}
                                                                hiddenColumn={visibleColumnsArray.length === 5}
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </th>
                                            <ColumnResize
                                                resizeEnd={(width) => console.log("resize end", width)}
                                                resizeStart={() => console.log("resize start")}
                                                className="columnResizer"
                                            />
                                        </>
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
