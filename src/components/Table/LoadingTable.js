import React from 'react';

const LoadingTable = ({ numRows, numCols }) => {
    const renderRows = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(
                <tr key={i} className="border-b dark:border-gray-700">
                    {renderCols()}
                </tr>
            );
        }
        return rows;
    };

    const renderCols = () => {
        const cols = [];
        for (let j = 0; j < numCols; j++) {
            cols.push(
                <td key={j} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="w-24 h-5 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"></div>
                </td>
            );
        }
        return cols;
    };

    return (
        <tbody>
            {renderRows()}
        </tbody>
    );
};

export default LoadingTable;
