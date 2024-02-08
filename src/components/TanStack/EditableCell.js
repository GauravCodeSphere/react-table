import React, { useEffect, useState } from 'react';

const EditableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    return (
        <>
            {row.getCanExpand() ? (
                <button
                    {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
                    }}
                    className='me-2'
                >
                    {row.getIsExpanded() ? '👇' : '👉'}
                </button>
            ) : (
                '🔵'
            )}
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}

            />
        </>

    );
}

export default EditableCell;
