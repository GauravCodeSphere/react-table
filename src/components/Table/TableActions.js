import { IoIosArrowDown } from "react-icons/io";
import Dropdown from './Dropdown';
import { buttonStyles } from '../../utils/material';
import { useDropdownState } from "../../hooks/dropDown";
import ColumnDropdown from "./ColumnDropdown";

import { FaFilter } from "react-icons/fa";


const TableActions = ({ actions, brands, selectedColumns, onColumnChange, setSelectedBrand }) => {
    const [dropdownStates, handleDropdownClick] = useDropdownState();
    const { showColDropdown } = dropdownStates;

    const renderDropdownButton = (dropdownType, buttonText, dropdownItems, handleFunction) => {
        const dropdownState = dropdownStates[dropdownType];

        return (
            <div className='flex flex-col items-center space-x-3 w-full md:w-auto'>
                <button
                    id={`${dropdownType}Button`}
                    onClick={() => handleDropdownClick(dropdownType)}
                    className={buttonStyles}
                    type="button"
                >
                    {buttonText !== "Filter" ? <IoIosArrowDown className='me-2' /> : <FaFilter className='me-2' />}
                    {buttonText}
                </button>
                {dropdownState && <Dropdown id={`${dropdownType}Dropdown`} items={dropdownItems} handleFunction={setSelectedBrand} />}
            </div>
        );
    };





    return (
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-3 w-full md:w-auto">
                {renderDropdownButton("showActionsDropdown", "Actions", actions)}
                {renderDropdownButton("showFilterDropdown", "Filter", brands)}

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
