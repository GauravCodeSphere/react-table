import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { buttonStyles } from './material';


const columns = [
    {
        width: 200,
        label: 'Product Name',
        dataKey: 'title',
    },
    {
        width: 120,
        label: 'Category',
        dataKey: 'category',
    },
    {
        width: 120,
        label: 'Brand',
        dataKey: 'brand',
    },
    {
        width: 120,
        label: 'Description',
        dataKey: 'description',
    },
    {
        width: 120,
        label: 'Price',
        dataKey: 'price',
        numeric: true,
    },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'left'}
                    style={{ width: column.width }}
                    sx={{
                        backgroundColor: 'background.paper',
                    }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={column.numeric || false ? 'right' : 'left'}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

const FakeDataGenerator = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateFakeData(100); // Generate fake data on initial render
    }, []);

    const generateFakeData = (numberOfRows) => {
        setLoading(true);
        setTimeout(() => {
            const fakeData = [...Array(numberOfRows).fill(null)].map(() => ({
                title: faker.commerce.productName(),
                category: faker.commerce.product(),
                brand: faker.company.name(),
                description: faker.lorem.sentence(),
                price: faker.commerce.price(),
            }));
            setData(fakeData);
            setLoading(false);
        }, 1000); // Simulating asynchronous data loading with a delay
    };


    return (
        loading ? (
            <div className='flex justify-center items-center mt-20'>Generating fake data...</div>
        ) : (
            <Paper style={{ height: 400, width: '100%' }}>
                <button className={buttonStyles} onClick={() => generateFakeData(100000)}>GenerateFakeData</button>
                <TableVirtuoso
                    data={data}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        )
    );
};

export default FakeDataGenerator;




