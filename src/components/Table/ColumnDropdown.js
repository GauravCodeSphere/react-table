import React from "react";
import { BsColumns } from "react-icons/bs";
import { buttonStyles, columnLabels } from "../../utils/material";
import { useDrag, useDrop } from "react-dnd";

const ColumnDropdown = ({ showColDropdown, handleDropdownClick, selectedColumns, moveColumn, onColumnChange }) => {
    return (
        <div className="dropdown">
            <button
                className={buttonStyles}
                onClick={() => handleDropdownClick("showColDropdown")}
                type="button"
                id="columnDropdown"
            >
                <BsColumns className="me-2" />
                Manage Columns
            </button>

            {showColDropdown && (
                <div className="z-10 w-48 p-3 absolute bg-white rounded-lg shadow dark:bg-gray-700">
                    {[...selectedColumns.keys()].map((column, index) => (
                        <ColumnDragItem
                            key={index}
                            label={columnLabels[column]}
                            type="COLUMN"
                            id={column}
                            index={index}
                            moveColumn={moveColumn}
                            selectedColumns={selectedColumns}
                            onColumnChange={onColumnChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ColumnDragItem = ({ label, type, id, index, moveColumn, selectedColumns, onColumnChange }) => {
    const [, drag] = useDrag({
        type,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: type,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveColumn(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className="flex items-center">
            <input
                type="checkbox"
                id={id}
                value={id}
                checked={selectedColumns.get(id)}
                onChange={() => onColumnChange(id)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                {label}
            </label>
        </div>
    );
};

export default ColumnDropdown;
