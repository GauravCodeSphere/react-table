import { useState } from "react";

export  function usePagination(initialItemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  
    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };
  
    return {
        currentPage,
        itemsPerPage,
        handlePageChange,
        handleItemsPerPageChange,
        startIndex,
        endIndex
    };
  }