import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import SearchForm from './SearchForm';
import TableActions from './TableActions';
import ProductItem from './ProductItem';
import LoadingTable from './LoadingTable';
import PaginationModel from './Pagination';
import JsonView from '../Model/JsonView';
import { ExportCSVButton } from '../../hooks/ExportCSVButton';
import { actions, buttonStyles, columnLabels } from '../../utils/material';

// import custom hooks 
import { useFilteredAndSortedProducts, useSorting, useSearch, useFieldCount, usePagination, useColumnVisibility } from '../../hooks';
import { useActions } from '../../store/actions';

const ProductTable = ({ products, loading, error }) => {

    const { deleteMultiProduct } = useActions()
    const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, startIndex, endIndex } = usePagination(10)
    const { selectedColumns, handleColumnChange, setSelectedColumns } = useColumnVisibility();
    const { searchTerm, handleSearch } = useSearch(handlePageChange);
    const { sortColumn, sortOrder, handleSort, resetSorting } = useSorting();

    const [selectedBrand, setSelectedBrand] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const { filteredProductsByBrand } = useFilteredAndSortedProducts(products, searchTerm, sortColumn, sortOrder, selectedBrand, 'brand');
    const filterOptions = useFieldCount(products, 'brand', 1);


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

    return (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 h-screen ">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-lg sm:rounded-lg overflow-hidden">
                    <div className='flex justify-end mt-3 me-4 gap-3'>
                        <JsonView productData={filteredProductsByBrand} />
                        <ExportCSVButton data={filteredProductsByBrand} filename="table_data" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <SearchForm onSearch={handleSearch} />
                        {sortColumn === null || <button className={buttonStyles} onClick={resetSorting}>Clear sort</button>}
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
                    <div className="overflow-x-auto">
                        {selectedItems.length > 0 &&
                            <div className='bg-sky-500 text-white ps-3 px-2 font-semibold'>
                                Selected Items: {selectedItems.length}
                            </div>}
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th></th>
                                    {[...selectedColumns.keys()]
                                        .filter(column => selectedColumns.get(column))
                                        .map((column, index) => (
                                            <th key={index} scope="col" className="px-4 py-3" onClick={() => handleSort(column)}>
                                                <div className='flex justify-center items-center'>

                                                    {getColumnHeaderLabel(column)}
                                                    <span className="ml-1">
                                                        {sortColumn === column
                                                            ? (sortOrder === 'asc' ? <FaSortUp className='mt-1' /> : <FaSortDown className='mb-1' />)
                                                            : <FaSort />
                                                        }
                                                    </span>
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
                                            handleCheckboxChange={handleCheckboxChange}
                                            selectedItems={selectedItems}
                                            expanded={index === expandedRowIndex}
                                            toggleExpanded={() => toggleExpanded(index)}
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
