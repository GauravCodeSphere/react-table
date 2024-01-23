import React from 'react';
import { Dropdown } from 'flowbite-react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineClear } from "react-icons/ai";
import { MdViewColumn, MdFilterListOff } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { RiSortDesc, RiSortAsc } from "react-icons/ri";
const ColumnDropDown = ({ column, resetSorting, handleSortby, clearFilter, showFilter, handleColumnChange, showAllColumn, clearSortState, disabledSortOption, filterState, hiddenColumn }) => {

    return (
        <>
            <Dropdown label="" dismissOnClick={true} renderTrigger={() => <span><BsThreeDotsVertical /></span>}>
                <Dropdown.Item className='disabled:opacity-50' icon={AiOutlineClear} disabled={clearSortState} onClick={resetSorting}>Clear sort</Dropdown.Item>
                <Dropdown.Item className='disabled:opacity-50' icon={RiSortAsc} disabled={disabledSortOption(column, "asc")} onClick={() => handleSortby(column, "asc")}>Sort by ascending</Dropdown.Item>
                <Dropdown.Item className='disabled:opacity-50' icon={RiSortDesc} disabled={disabledSortOption(column, "desc")} onClick={() => handleSortby(column, "desc")}>Sort by descending</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='disabled:opacity-50' icon={MdFilterListOff} disabled={!filterState} onClick={clearFilter}> Clear filter</Dropdown.Item>
                <Dropdown.Item className='disabled:opacity-50' icon={IoFilterSharp} onClick={showFilter}>Filter by {column}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='disabled:opacity-50' icon={BiSolidHide} onClick={handleColumnChange}>Hide {column} column</Dropdown.Item>
                <Dropdown.Item className='disabled:opacity-50' icon={MdViewColumn} disabled={hiddenColumn} onClick={showAllColumn}>Show all column</Dropdown.Item>
            </Dropdown>
        </>
    );
}

export default ColumnDropDown;
