import React from 'react';
import EmployeeTable from '../components/TanStack';

const TanStackTable = () => {
    return (
        <div>
            <EmployeeTable  getRowCanExpand={() => true}
/>
        </div>
    );
}

export default TanStackTable;
