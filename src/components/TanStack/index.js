import React, { useMemo, useState } from 'react';
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { columnDef } from './Columns';
import { FakeData } from '../../utils/userData';
import TableHeader from './TableHeader';
import Pagination from './Pagination';
import { Checkbox, Paper, Table, TableBody, TableContainer } from '@mui/material';
import TableRows from './TableRow';
import SearchForm from '../Table/SearchForm';
import ColumnVisibilityDropDown from './ColumnVisibilityDropDown';
import { buttonStyles } from '../../utils/material';
import FilterPopover from './FilterPopover';
import PinnedRow from './PinnedRow';

const EmployeeTable = ({ getRowCanExpand }) => {

    const finalData = useMemo(() => FakeData(), [])
    const [data, setData] = useState(finalData)

    const finalColumnDef = useMemo(() => columnDef, [])
    const [columns] = useState(() => [...columnDef]);
    const [sorting, setSorting] = useState()
    const [filtering, setFiltering] = useState()
    const [rowSelection, setRowSelection] = useState({})
    const [columnOrder, setColumnOrder] = useState(
        columns.map(column => column.accessorKey)
    );

    const [columnVisibility, setColumnVisibility] = useState()
    const resetOrder = () => setColumnOrder(columns.map(column => column.accessorKey));
    const [columnFilters, setColumnFilters] = useState()
    const [grouping, setGrouping] = useState([])
    const [copyPinnedRows, setCopyPinnedRows] = useState(false)

    const [rowPinning, setRowPinning] = useState({
        top: [],
        bottom: [],
    })


    const reorderRow = (draggedRowIndex, targetRowIndex) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData.splice(targetRowIndex, 0, newData.splice(draggedRowIndex, 1)[0]);
            return newData;
        });
    };



    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFiltering,
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: "onChange",
        getRowCanExpand,
        getExpandedRowModel: getExpandedRowModel(),
        onGroupingChange: setGrouping,
        getGroupedRowModel: getGroupedRowModel(),
        getRowId: row => row.userId, //good to have guaranteed unique row ids/keys for rendering

        meta: {
            updateData: (rowIndex, columnId, value) => setData(
                prev => prev.map((row, index) =>
                    index === rowIndex ? {
                        ...prev[rowIndex],
                        [columnId]: value,
                    } : row
                )
            )
        },
        onColumnFiltersChange: setColumnFilters,
        onRowPinningChange: setRowPinning,
        state: {
            sorting: sorting,
            globalFilter: filtering,
            rowSelection: rowSelection,
            columnOrder: columnOrder,
            columnVisibility: columnVisibility,
            columnFilters: columnFilters,
            grouping: grouping,
            rowPinning: rowPinning,
        },
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,

    })

    const paginationProps = useMemo(() => {
        return {
            pagination: {
                pageSize: tableInstance.options.state.pagination.pageSize,
                pageIndex: tableInstance.options.state.pagination.pageIndex,
            },
            getPageCount: tableInstance.getPageCount,
            setPageSize: tableInstance.setPageSize,
            setPageIndex: tableInstance.setPageIndex,
        };
    }, [tableInstance.options.state.pagination.pageSize, tableInstance.options.state.pagination.pageIndex, tableInstance.getPageCount()]);


    return (
        <>
            <TableContainer component={Paper}>
                <button onClick={() => setColumnOrder(["isActive", "email"])} className={buttonStyles}>Change Order</button>
                <button onClick={() => resetOrder()} className={buttonStyles}>Reset Order</button>
                <div>
                    <label>
                        <Checkbox
                            size='small'
                            type="checkbox"
                            checked={tableInstance.getIsAllColumnsVisible()}
                            onChange={tableInstance.getToggleAllColumnsVisibilityHandler()}
                        />
                        Toggle All ColumnVisibility
                    </label>
                </div>
                <ColumnVisibilityDropDown option={tableInstance.getAllLeafColumns()} />
                <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                <SearchForm onSearch={setFiltering} />
                <Table className='shadow-lg'
                // {...{
                //     style: {
                //         width: tableInstance.getCenterTotalSize(),
                //     },
                // }}
                >

                    <TableHeader headerGroup={tableInstance.getHeaderGroups()} columnOrder={columnOrder} setColumnOrder={setColumnOrder} />

                    <TableBody>
                        {tableInstance.getTopRows().map(row => (
                            <PinnedRow key={row.id} row={row} table={tableInstance} />
                        ))}

                        {(copyPinnedRows
                            ? tableInstance.getRowModel().rows
                            : tableInstance.getCenterRows()
                        ).map((rowEl) => (
                            <TableRows key={rowEl.id} rowEl={rowEl.getVisibleCells()} row={rowEl} reorderRow={reorderRow} />

                        )
                        )}

                        {tableInstance.getBottomRows().map(row => (
                            <PinnedRow key={row.id} row={row} table={tableInstance} />
                        ))}

                    </TableBody>

                </Table>

                <Pagination tableInstance={tableInstance} {...paginationProps} />

            </TableContainer>
        </>
    );
}

export default EmployeeTable;
