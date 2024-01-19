import { IoIosArrowDown } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Dropdown from './Dropdown';
import { buttonStyles } from '../../utils/material';
import { useDropdownState } from "../../hooks/dropDown";
import ColumnDropdown from "./ColumnDropdown";
import { IoMdAdd } from "react-icons/io";
import ProductPopup from "../Model/ProductPopup";
import { useState } from "react";

const TableActions = ({ actions, brands, selectedColumns, onColumnChange, setSelectedBrand, handleDelete }) => {
    const [dropdownStates, handleDropdownClick] = useDropdownState();
    const { showColDropdown, showActionsDropdown, showFilterDropdown } = dropdownStates;

    const [open, setOpen] = useState(false)


    return (
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            {open && <ProductPopup isOpen={open} onClose={() => setOpen(false)} productData={[]} name={"Create Product"} />}
            <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className='flex flex-col items-center space-x-3 w-full md:w-auto'>
                    <button
                        onClick={() => setOpen(true)}
                        className={buttonStyles}
                        style={{ background: "#0ea5e9", color: "white" }}
                        type="button"
                    >
                        <IoMdAdd className='me-2' />
                        Add Product
                    </button>
                </div>
                <div className='flex flex-col items-center space-x-3 w-full md:w-auto'>
                    <button
                        id={`showActionsDropdownButton`}
                        onClick={() => handleDropdownClick("showActionsDropdown")}
                        className={buttonStyles}
                        type="button"
                    >
                        <IoIosArrowDown className='me-2' />
                        Actions
                    </button>
                    {showActionsDropdown && <Dropdown id={`showActionsDropdownDropdown`} items={actions} handleFunction={handleDelete} />}
                </div>
                <div className='flex flex-col items-center space-x-3 w-full md:w-auto'>
                    <button
                        id={`showFilterDropdownButton`}
                        onClick={() => handleDropdownClick("showFilterDropdown")}
                        className={buttonStyles}
                        type="button"
                    >
                        <FaFilter className='me-2' />
                        Filter
                    </button>
                    {showFilterDropdown && <Dropdown id={`showFilterDropdownDropdown`} items={brands} handleFunction={setSelectedBrand} />}
                </div>

                <ColumnDropdown
                    showColDropdown={showColDropdown}
                    handleDropdownClick={handleDropdownClick}
                    selectedColumns={selectedColumns}
                    onColumnChange={onColumnChange}
                />
            </div>
        </div>
    );
};

export default TableActions;
