import React from 'react';
import { buttonStyles } from '../../utils/material';

const ColorChange = ({ selectedItems, setSelectedItems, addColor, removeColor }) => {


  const handleColorChange = (e) => {
    const color = e.target.value;
    addColor(selectedItems, color);
    setSelectedItems([]);
  };

  const handleRemoveColor = () => {
    removeColor(selectedItems);
    setSelectedItems([]);
  };

  const colorOptions = ['lightblue', 'lightgreen', 'lightcoral'];

  return (
    <>
      <select id="colorSelect" onChange={handleColorChange} className={`appearance-none ${buttonStyles}`}>
        <option value="">Apply Color</option>
        {colorOptions.map((color, index) => (
          <option style={{ color: "#000" }} key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
      <button className={buttonStyles} onClick={handleRemoveColor}>
        Remove Color
      </button>
    </>
  );
};

export default ColorChange;
