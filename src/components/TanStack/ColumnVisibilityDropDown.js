import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { Dropdown } from 'flowbite-react';


const ColumnVisibilityDropDown = ({ option }) => {

    return (
        <div className='mb-5 mt-10'>
            <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span className="p-3 bg-sky-500 text-white rounded-lg cursor-pointer my-auto">Column Visibility</span>}>
                {option.map((column) => {
                    return (
                        <Dropdown.Item>
                            <div key={column.id}>
                                <label>
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />{" "}
                                    {column.columnDef.header}
                                </label>
                            </div>
                        </Dropdown.Item>
                    )
                })}
            </Dropdown>

        </div>
    );
}

export default ColumnVisibilityDropDown;
