import React, { memo } from 'react';
import { flexRender } from '@tanstack/react-table';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import { TableHead, TableRow, TextField, TableCell } from '@mui/material';
import DraggableColumnWrapper from './DraggableColumnWrapper';
import FilterFunction from './FilterFunction';


const TableHeader = ({ headerGroup, columnOrder, setColumnOrder }) => {

    return (
        <TableHead>
            {headerGroup.map((headerEl) => (
                <TableRow key={headerEl.id}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {headerEl.headers.map((columnEl) => {
                        return (
                            <DraggableColumnWrapper
                                key={columnEl.id}
                                header={columnEl}
                                // table={tableInstance}
                                columnOrder={columnOrder}
                                setColumnOrder={setColumnOrder}
                                enableDragAndDrop={columnEl.column.columnDef.enableDragAndDrop}
                            >
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <span>
                                            {flexRender(
                                                columnEl.column.columnDef.header,
                                                columnEl.getContext()
                                            )}
                                        </span>
                                        {columnEl.column.getCanGroup() ? (
                                            <button
                                                {...{
                                                    onClick: columnEl.column.getToggleGroupingHandler(),
                                                    style: {
                                                        cursor: 'pointer',
                                                    },
                                                }}
                                            >
                                                {columnEl.column.getIsGrouped()
                                                    ? `🛑(${columnEl.column.getGroupedIndex()}) `
                                                    : `👊 `}
                                            </button>
                                        ) : null}{' '}
                                        {columnEl.column.getCanSort() &&
                                            <span onClick={columnEl.column.getToggleSortingHandler()}>
                                                {columnEl.column.getIsSorted() === 'asc' ? <FaArrowUpLong /> : columnEl.column.getIsSorted() === 'desc' ? <FaArrowDownLong /> : <BiSortAlt2 />}
                                            </span>}
                                    </div>
                                    {columnEl.column.getCanFilter() ?
                                        <div>
                                            <TextField
                                                id="standard-basic"
                                                label={columnEl.column.columnDef.header}
                                                variant="standard"
                                                type='text'
                                                value={(columnEl.column.getFilterValue() || '')}
                                                onChange={(e) => columnEl.column.setFilterValue(e.target.value)}
                                            />
                                        </div>
                                        : null
                                    }
                                    {/* <FilterFunction column={columnEl.column} table={tableInstance} /> */}
                                </div>
                            </DraggableColumnWrapper>
                        )
                    })}
                </TableRow>
            ))}
        </TableHead>
    );
}

export default TableHeader;
