import { flexRender } from "@tanstack/react-table";

export default function PinnedRow({ row, table }) {
    return (
        <tr
            style={{
                backgroundColor: 'lightblue',
                position: 'sticky',
                top:
                    row.getIsPinned() === 'top'
                        ? `${row.getPinnedIndex() * 26 + 48}px`
                        : undefined,
                bottom:
                    row.getIsPinned() === 'bottom'
                        ? `${(table.getBottomRows().length - 1 - row.getPinnedIndex()) * 26
                        }px`
                        : undefined,
            }}
        >
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
            {row.getVisibleCells().map((cell) => {
                return (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                );
            })}
        </tr>
    );
}
