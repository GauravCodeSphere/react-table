import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

const data = [
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        email: 'dmurray@yopmail.com',
        city: 'East Daphne',
        country: 'USA',
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        email: 'rkholer33@yopmail.com',
        city: 'Columbus',
        country: 'USA',
    },
    {
        firstName: 'Ervin',
        lastName: 'Reinger',
        email: 'ereinger@mailinator.com',
        city: 'Toronto',
        country: 'Canada',
    },
    {
        firstName: 'Brittany',
        lastName: 'McCullough',
        email: 'bmccullough44@mailinator.com',
        city: 'Lincoln',
        country: 'USA',
    },
    {
        firstName: 'Branson',
        lastName: 'Frami',
        email: 'bframi@yopmain.com',
        city: 'New York',
        country: 'USA',
    },
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        email: 'dmurray@yopmail.com',
        city: 'East Daphne',
        country: 'USA',
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        email: 'rkholer33@yopmail.com',
        city: 'Columbus',
        country: 'USA',
    },
    {
        firstName: 'Ervin',
        lastName: 'Reinger',
        email: 'ereinger@mailinator.com',
        city: 'Toronto',
        country: 'Canada',
    },
    {
        firstName: 'Brittany',
        lastName: 'McCullough',
        email: 'bmccullough44@mailinator.com',
        city: 'Lincoln',
        country: 'USA',
    },
    {
        firstName: 'Branson',
        lastName: 'Frami',
        email: 'bframi@yopmain.com',
        city: 'New York',
        country: 'USA',
    },
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        email: 'dmurray@yopmail.com',
        city: 'East Daphne',
        country: 'USA',
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        email: 'rkholer33@yopmail.com',
        city: 'Columbus',
        country: 'USA',
    },
    {
        firstName: 'Ervin',
        lastName: 'Reinger',
        email: 'ereinger@mailinator.com',
        city: 'Toronto',
        country: 'Canada',
    },
    {
        firstName: 'Brittany',
        lastName: 'McCullough',
        email: 'bmccullough44@mailinator.com',
        city: 'Lincoln',
        country: 'USA',
    },
    {
        firstName: 'Branson',
        lastName: 'Frami',
        email: 'bframi@yopmain.com',
        city: 'New York',
        country: 'USA',
    },
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        email: 'dmurray@yopmail.com',
        city: 'East Daphne',
        country: 'USA',
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        email: 'rkholer33@yopmail.com',
        city: 'Columbus',
        country: 'USA',
    },
    {
        firstName: 'Ervin',
        lastName: 'Reinger',
        email: 'ereinger@mailinator.com',
        city: 'Toronto',
        country: 'Canada',
    },
    {
        firstName: 'Brittany',
        lastName: 'McCullough',
        email: 'bmccullough44@mailinator.com',
        city: 'Lincoln',
        country: 'USA',
    },
    {
        firstName: 'Branson',
        lastName: 'Frami',
        email: 'bframi@yopmain.com',
        city: 'New York',
        country: 'USA',
    },
];



const MaterialTableComponent = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name', //uses the default width from defaultColumn prop
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                enableResizing: false, //disable resizing for this column
            },
            {
                accessorKey: 'email',
                header: 'Email Address',
                size: 200, //increase the width of this column
            },
            {
                accessorKey: 'city',
                header: 'City',
                size: 120, //decrease the width of this column
            },
            {
                accessorKey: 'country',
                header: 'Country',
                size: 100, //decrease the width of this column
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        //optionally override the default column widths
        defaultColumn: {
            maxSize: 400,
            minSize: 80,
            size: 160, //default size is usually 180
        },
        enableColumnResizing: true,
        columnResizeMode: 'onChange', //default
    });

    return (<>
        <div className='m-20'>
            <MaterialReactTable table={table} />
        </div>
    </>)

};

export default MaterialTableComponent;
