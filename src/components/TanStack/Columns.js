import { createColumnHelper } from "@tanstack/react-table"
import IndeterminateCheckBox from "./IndeterminateCheckBox";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";

const columnHelper = createColumnHelper();

function name(row, columnId, filterValue) {
    // console.log("row",row);
    console.log("columnId", columnId);
    // console.log("filterValue",filterValue);
    if (columnId === "Name") {
        console.log(row.original.firstName);
        let test = row.original.firstName.includes(filterValue)
        return test
    }

}

// name.autoRemove = (val) => val === "ai";

export const columnDef = [

    {
        id: "select",
        accessorKey: "select",
        enableColumnFilter: false,
        enableDragAndDrop: false,
        enableGrouping: false,
        enableSorting: false,
        header: ({ table }) => (
            <IndeterminateCheckBox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
            />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckBox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
    },
    columnHelper.accessor("id", {        // Its another way to create column header
        header: "ID",
        enableColumnFilter: false,
        enableDragAndDrop: false,
        aggregationFn: undefined,
        enableGrouping: false,
        enableSorting: false,

    }),
    {
        // accessorFn: (row) => `${row.firstName} ${row.lastName}`,   // cell merge example
        header: "Name",
        accessorKey: "firstName",
        cell: EditableCell,

        // filterFn: name
    },
    // {
    //     accessorKey: "lastName",
    //     header: "Last Name"
    // },
    {
        accessorKey: "email",
        header: "Email",
        enableGrouping: false,
        // filterFn: name

    },
    {
        accessorKey: "phoneNumber",
        header: "Phone no.",
        enableGrouping: false,
    },
    {
        accessorKey: "age",
        header: "Age",
        aggregatedCell: ({ getValue }) =>
            Math.round(getValue() * 100) / 100,
        aggregationFn: 'min', // Use 'min' to find the lowest age

    },
    {
        accessorKey: "salary",
        header: "Salary"
    },
    {
        accessorKey: "dateOfJoining",
        header: "Joining Date"
    },
    {
        accessorKey: "isActive",
        header: "isActive",
        cell: StatusCell,
        getGroupingValue: (row) => row.isActive,

        filterFn: (row, columnId, filterStatuses) => {
            if (filterStatuses.length === 0) return true
            const status = row.getValue(columnId);
            return filterStatuses.includes(status)
        }


    },
]   