import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { TableCell, TableRow } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

const renderSubComponent = ({ row }) => {
    return (
        <pre style={{ fontSize: '10px' }}>
            <code>{JSON.stringify(row.original, null, 2)}</code>
        </pre>
    );
};

const TableRows = ({ rowEl, row, reorderRow }) => {
    const isGrouped = row.getIsGrouped();
    const isExpanded = row.getIsExpanded();

    const [, dropRef] = useDrop({
        accept: 'row',
        drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => row,
        type: 'row',
    });

    return (
        <>
            <TableRow key={rowEl.id} ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <TableCell>
                    {row.getIsPinned() ? (
                        <button
                            onClick={() => row.pin(false)}
                        >
                            ❌
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                                onClick={() =>
                                    row.pin('top')
                                }
                            >
                                ⬆️
                            </button>
                            <button
                                onClick={() =>
                                    row.pin('bottom')
                                }
                            >
                                ⬇️
                            </button>
                        </div>
                    )}
                </TableCell>
                <TableCell ref={dropRef}>
                    <button ref={dragRef}>🟰</button>
                </TableCell>
                {rowEl.map((cellEl) => (
                    <TableCell
                        {...{
                            key: cellEl.id,
                            style: {
                                background: cellEl.getIsGrouped()
                                    ? '#0aff0082'
                                    : cellEl.getIsAggregated()
                                        ? '#ffa50078'
                                        : cellEl.getIsPlaceholder()
                                            ? '#ff000042'
                                            : 'white',
                            },
                        }}
                    >
                        {cellEl.getIsGrouped() ? (
                            <>
                                <button
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                        style: {
                                            cursor: row.getCanExpand()
                                                ? 'pointer'
                                                : 'normal',
                                        },
                                    }}
                                >
                                    {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                    {flexRender(
                                        cellEl.column.columnDef.cell,
                                        cellEl.getContext()
                                    )}{' '}
                                    ({row.subRows.length})
                                </button>
                            </>
                        ) : cellEl.getIsAggregated() ? (
                            flexRender(
                                cellEl.column.columnDef.aggregatedCell ??
                                cellEl.column.columnDef.cell,
                                cellEl.getContext()
                            )
                        ) : cellEl.getIsPlaceholder() ? null : (
                            flexRender(
                                cellEl.column.columnDef.cell,
                                cellEl.getContext()
                            )
                        )}

                    </TableCell>
                ))}
            </TableRow>

            {isExpanded && !isGrouped && (
                // Render the expanded sub-component for non-grouped rows
                <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default TableRows;
