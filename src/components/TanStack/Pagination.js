import { memo } from 'react';
import GoToPageInput from '../Table/ GoToPageInput';
import { Pagination } from "@mui/material";

const PAGE_SIZE = [10, 20, 30, 40, 50]

const PaginationModel = ({ pagination, getPageCount, setPageSize, setPageIndex }) => {
    
    const { pageSize, pageIndex } = pagination;
    const pageCount = getPageCount();
    
    const handlePageClick = (event, page) => {
        if (page === 0 || page > pageCount) return;
        setPageIndex(page - 1);
    };

    console.log("PaginationModel rendering");

    return (
        <>
            <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
            >
                <div>
                    Rows per Page:
                    <select
                        value={pageSize}
                        onChange={(e)=>setPageSize(e.target.value)}
                        className="border rounded-md px-2 py-1"
                    >
                        {PAGE_SIZE.map(pageSizeEl => {
                            return <option key={pageSizeEl} value={pageSizeEl}>{pageSizeEl}</option>
                        })}
                    </select>
                    {" "}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.min(pageIndex * pageSize, pageCount * pageSize) + 1}
                        </span>
                        <span className="mx-1 font-semibold text-gray-900 dark:text-white">-</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {(pageIndex + 1) * pageSize}
                        </span>
                        <span className="mx-1 font-semibold text-gray-900 dark:text-white">of</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{pageCount * pageSize}</span>
                    </span>
                </div>

                <GoToPageInput totalPages={pageCount} onPageChange={setPageIndex} extra={1} />

                <Pagination
                    count={pageCount}
                    onChange={handlePageClick}
                    page={pageIndex + 1}
                />
            </nav>
        </>
    );
}

export default memo(PaginationModel);




