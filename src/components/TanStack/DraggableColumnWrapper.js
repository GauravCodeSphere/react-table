import { TableCell } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";

const reorderColumn = (
    draggedColumnId,
    targetColumnId,
    columnOrder
) => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
    );
    return [...columnOrder];
};

const DraggableColumnWrapper = ({ children, header, table, columnOrder,setColumnOrder, enableDragAndDrop }) => {
    // const { getState, setColumnOrder } = table;
    // const { columnOrder } = getState();
    const { column } = header;


    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            );
            setColumnOrder(newColumnOrder);
        },
        // canDrop: () => enableDragAndDrop,
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
        canDrag: enableDragAndDrop === false ? false : true,
    });

    const resizeHandler = (event) => {
        // Check if dragging is in progress to avoid interfering with DnD
        if (header.column.getIsResizing()) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        // <TableCell>
        //     <div className="flex justify-center items-center">

                <TableCell
                    ref={(node) => dropRef(dragRef(node))}
                    colSpan={header.colSpan}
                    style={{ opacity: isDragging ? 0.5 : 1 }}
                    // {...{
                    //     key: header.id,
                    //     colSpan: header.colSpan,
                    //     style: {
                    //         width: header.getSize(),
                    //     },
                    // }}
                    // onMouseDown={(event) => {
                    //     resizeHandler(event);
                    //     header.getResizeHandler()(event);
                    // }}
                    // onTouchStart={(event) => {
                    //     resizeHandler(event);
                    //     header.getResizeHandler()(event);
                    // }}
                >
                    <div ref={previewRef} className='flex justify-center items-start'>
                        {isDragging ? null : (
                            <>
                                {children}
                                {enableDragAndDrop === false ? null : <button ref={dragRef}>🟰</button>}

                            </>
                        )}
                    </div>
                </TableCell>
        //         <div
        //             onDoubleClick={() => header.column.resetSize()}
        //             onMouseDown={header.getResizeHandler()}
        //             onTouchStart={header.getResizeHandler()}
        //             className={`ms-2 cursor-col-resize resizer ${table.options.columnResizeDirection} ${header.column.getIsResizing() ? 'isResizing' : ''
        //                 }`}
        //             style={{
        //                 transform:
        //                     table.options.columnResizeMode === 'onEnd' &&
        //                         header.column.getIsResizing()
        //                         ? `translateX(${table.getState().columnSizingInfo.deltaOffset ?? 0
        //                         }px)`
        //                         : '',
        //             }}
        //         >||</div>
        //     </div>

        // </TableCell>

    );
};


export default DraggableColumnWrapper;