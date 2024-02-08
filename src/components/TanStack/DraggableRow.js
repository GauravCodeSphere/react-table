import { flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";


const DraggableRow = ({ row, reorderRow }) => {
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
        <tr ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <td ref={dropRef}>
                <button ref={dragRef}>🟰</button>
            </td>
            {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    );
};



export default DraggableRow;