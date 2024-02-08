import React from 'react';

const TableCell = ({ cellEl }) => {
    return (
        <td key={cellEl.id}>
            {cellEl.render('Cell')}
        </td>
    );
}

export default TableCell;