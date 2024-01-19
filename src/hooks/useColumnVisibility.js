import { useState } from "react";


const initialColumnVisibility = new Map([
    ['productName', true],
    ['category', true],
    ['brand', true],
    ['description', true],
    ['price', true]
  ]);
  
  
  export const useColumnVisibility = () => {
    const [selectedColumns, setSelectedColumns] = useState(initialColumnVisibility);
  
    const handleColumnChange = (selectedColumn) => {
      setSelectedColumns((prevVisibility) => {
        const newVisibility = new Map(prevVisibility);
        newVisibility.set(selectedColumn, !prevVisibility.get(selectedColumn));
        return newVisibility;
      });
    };
  
    return {
      selectedColumns,
      handleColumnChange,
      setSelectedColumns
    };
  };