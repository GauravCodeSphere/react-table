import { Pagination } from "@mui/material";
import GoToPageInput from "./ GoToPageInput";

const PaginationModel = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (event, page) => {
        if (page === 0 || page > totalPages) return
        onPageChange(page);
    };
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        onItemsPerPageChange(newItemsPerPage);
    };

    const handleGoToPage = (pageNumber) => {
        onPageChange(pageNumber);
    };


    return (
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            <div className="flex items-center space-x-2">
                <span className="text-gray-500 dark:text-gray-400">Rows per Page:</span>
                <select
                    className="border rounded-md px-2 py-1"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    {[10, 20, 30, 40, 50].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {(currentPage - 1) * itemsPerPage + 1}
                    </span>
                    <span className="mx-1 font-semibold text-gray-900 dark:text-white">-</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.min(currentPage * itemsPerPage, totalItems)}
                    </span>
                    <span className="mx-1 font-semibold text-gray-900 dark:text-white">of</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
                </span>

            </div>
            <GoToPageInput totalPages={totalPages} onPageChange={handleGoToPage} />

            <Pagination
                count={totalPages}
                onChange={handlePageClick}
                page={currentPage}
            />
        </nav>
    );
};



export default PaginationModel;
