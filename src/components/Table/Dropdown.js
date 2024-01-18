// Dropdown.js
import React from 'react';

const Dropdown = ({ id, items,handleFunction }) => (
  <div id={id} className="z-10 mt-10 w-48 p-3 absolute bg-white rounded-lg shadow dark:bg-gray-700">
        {items.map((item) => (
            <div key={item.id} className="flex items-center">
                <input
                    id={item.id}
                    type="checkbox"
                    defaultValue=""
                    onChange={()=>handleFunction(item.label)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                    htmlFor={item.id}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                    {item.label} ({item.count})
                </label>
            </div>
        ))}
    </div>
);

export default Dropdown;