import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const FilterPopover = ({ columnFilters, setColumnFilters }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterClick = (clickedValue) => {
        const filterId = "isActive";

        // Check if columnFilters is defined
        if (!columnFilters) {
            setColumnFilters([{ id: filterId, value: [clickedValue] }]);
            handleClose();
            return;
        }

        // Check if a filter with the given id already exists
        const existingFilter = columnFilters.find(filter => filter.id === filterId);

        if (existingFilter) {
            // Check if the clicked value already exists in the filter
            const isValueAlreadySelected = existingFilter.value.includes(clickedValue);

            if (isValueAlreadySelected) {
                // If the value exists, remove it from the filter
                setColumnFilters(prevFilters => (
                    prevFilters.map(filter =>
                        filter.id === filterId
                            ? { ...filter, value: filter.value.filter(value => value !== clickedValue) }
                            : filter
                    )
                ));
            } else {
                // If the value doesn't exist, add it to the filter
                setColumnFilters(prevFilters => (
                    prevFilters.map(filter =>
                        filter.id === filterId
                            ? { ...filter, value: [...filter.value, clickedValue] }
                            : filter
                    )
                ));
            }
        } else {
            // If no filter exists, create a new filter with the clicked value
            setColumnFilters(prevFilters => (
                [...(prevFilters || []), { id: filterId, value: [clickedValue] }]
            ));
        }

        handleClose();
    };


    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Filter
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    style={{ background: columnFilters && columnFilters.some((filter) => filter.id === 'isActive' && filter.value.includes('Active')) ? "#0ea5e9" : '' }}
                    onClick={() => handleFilterClick('Active')}
                >
                    Active
                </MenuItem>
                <MenuItem
                    style={{ background: columnFilters && columnFilters.some((filter) => filter.id === 'isActive' && filter.value.includes('Inactive')) ? "#0ea5e9" : '' }}
                    onClick={() => handleFilterClick('Inactive')}
                >
                    Inactive
                </MenuItem>
            </Menu>
        </div>
    );
}

export default FilterPopover;
