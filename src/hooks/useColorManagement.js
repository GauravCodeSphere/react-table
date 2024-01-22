import { useState } from 'react';

export const useColorManagement = () => {
  const [rowColors, setRowColors] = useState({});

  const addColor = (selectedItems, color) => {
    const updatedColors = {};

    selectedItems.forEach((itemId) => {
      const rowIndex = itemId - 1;
      updatedColors[rowIndex] = color;
    });

    setRowColors((prevRowColors) => ({ ...prevRowColors, ...updatedColors }));
  };

  const removeColor = (selectedItems) => {
    const updatedColors = {};

    selectedItems.forEach((itemId) => {
      const rowIndex = itemId - 1;
      updatedColors[rowIndex] = undefined;
    });

    setRowColors((prevRowColors) => ({ ...prevRowColors, ...updatedColors }));
  };

  return { rowColors, addColor, removeColor };

};

