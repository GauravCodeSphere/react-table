import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const StatusCell = ({ getValue, row, column, table }) => {

    const initialValue = getValue() || {};
    const { updateData } = table.options.meta

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                {initialValue}
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
                <MenuItem onClick={() => updateData(row.index, column.id, "Active")}>Active</MenuItem>
                <MenuItem onClick={() => updateData(row.index, column.id, "inActive")}>InActive</MenuItem>
            </Menu>
        </div>
    );
}

export default StatusCell;
