
import React, { useEffect, useState } from 'react';
import { useActions } from '../store/actions';
import { useSelector } from 'react-redux';

const AdvancedFilter = () => {

    const data = useSelector((state) => state.product.products);
    const { fetchProducts } = useActions();
    const [filteredData, setFilteredData] = useState(data);
    const [type, setType] = useState('AND');
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    if (data.length === 0) {
        return <h1>Loading</h1>
    }

    const columns = Object.keys(data[0]).map(key => {
        return { id: key, label: key.charAt(0).toUpperCase() + key.slice(1) };
    });

    console.log(columns);

    // const columns = [
    //     { id: 'age', label: 'Age' },
    //     { id: 'sport', label: 'Sport' },
    //     { id: 'country', label: 'Country' },
    // ];

    const methods = [
        { name: 'Contains', key: 'contains' },
        { name: 'Does Not Contain', key: 'notContains' },
        { name: 'Equals', key: 'equals' },
        { name: 'Not Equal', key: 'notEqual' },
        { name: 'Starts With', key: 'startsWith' },
        { name: 'Ends With', key: 'endsWith' },
        { name: 'Is Blank', key: 'blank' },
        { name: 'Is Not Blank', key: 'notBlank' },
        { name: '>', key: 'greaterThan' },
        { name: '>=', key: 'greaterThanOrEqual' },
        { name: '<', key: 'lessThan' },
        { name: '<=', key: 'lessThanOrEqual' },
        { name: 'Is True', key: 'true' },
        { name: 'Is False', key: 'false' },
    ];

    const addCondition = () => {
        const newCondition = {
            colId: '',
            type: 'contains',
            filter: '',
        };

        // Check if the last condition has filterType set to 'join'
        if (conditions.length > 0 && conditions[conditions.length - 1].filterType === 'join') {
            // Add the new condition within the last condition's conditions array
            const lastJoinCondition = conditions[conditions.length - 1];
            const newJoinCondition = {
                colId: '',
                type: 'contains',
                filter: '',
            };
            lastJoinCondition.conditions = [...lastJoinCondition.conditions, newJoinCondition];
            setConditions([...conditions]);
        } else {
            // Add a new standalone condition
            setConditions([...conditions, newCondition]);
        }
    };

    const addJoin = () => {
        const newJoinCondition = {
            filterType: 'join',
            type: 'AND',
            conditions: [],
        };

        setConditions([...conditions, newJoinCondition]);
    };
    console.log(conditions);
    const removeCondition = (index) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        setConditions(newConditions);
    };

    const handleConditionChange = (index, key, value) => {
        const newConditions = [...conditions];
        newConditions[index][key] = value;
        setConditions(newConditions);
    };

    const evaluateCondition = (condition, row) => {
        if (condition.conditions) {
            // Handle nested conditions (AND, OR)
            if (condition.type === 'AND') {
                return condition.conditions.every((nestedCondition) =>
                    evaluateCondition(nestedCondition, row)
                );
            } else if (condition.type === 'OR') {
                return condition.conditions.some((nestedCondition) =>
                    evaluateCondition(nestedCondition, row)
                );
            }
        } else {
            // Evaluate individual condition
            const { colId, type, filter } = condition;
            const cellValue = row[colId];

            switch (type) {
                case 'contains':
                    return cellValue.includes(filter);
                case 'notContains':
                    return !cellValue.includes(filter);
                case 'equals':
                    return cellValue === filter;
                case 'notEqual':
                    return cellValue !== filter;
                case 'startsWith':
                    return cellValue.startsWith(filter);
                case 'endsWith':
                    return cellValue.endsWith(filter);
                case 'blank':
                    return cellValue === '';
                case 'notBlank':
                    return cellValue !== '';
                case 'greaterThan':
                    return cellValue > filter;
                case 'greaterThanOrEqual':
                    return cellValue >= filter;
                case 'lessThan':
                    return cellValue < filter;
                case 'lessThanOrEqual':
                    return cellValue <= filter;
                case 'true':
                    return cellValue === true;
                case 'false':
                    return cellValue === false;
                default:
                    return true;
            }
        }
    };


    const applyFilter = () => {
        // // Convert conditions to the desired filter model
        // const advancedFilterModel = {
        //     filterType: 'join',
        //     type,
        //     conditions: conditions.map((condition) => ({
        //         filterType: 'text', // Assuming filterType is always 'text' for simplicity
        //         colId: condition.colId,
        //         type: condition.type,
        //         filter: condition.filter,
        //     })),
        // };

        // console.log(advancedFilterModel);

        // // Apply the filter to the data
        // const filtered = data.filter((row) => evaluateCondition({ filterType: 'join', type, conditions }, row));
        // console.log(filtered);
        // setFilteredData(filtered);
        // Convert conditions to the desired filter model
        const advancedFilterModel = {
            filterType: 'join',
            type,
            conditions: conditions.map((condition) => {
                if (condition.filterType === 'join') {
                    // Recursive call for nested conditions
                    return {
                        filterType: 'join',
                        type: condition.type,
                        conditions: condition.conditions.map((nestedCondition) => ({
                            filterType: 'text', // Assuming filterType is always 'text' for simplicity
                            colId: nestedCondition.colId,
                            type: nestedCondition.type,
                            filter: nestedCondition.filter,
                        })),
                    };
                } else {
                    return {
                        filterType: 'text', // Assuming filterType is always 'text' for simplicity
                        colId: condition.colId,
                        type: condition.type,
                        filter: condition.filter,
                    };
                }
            }),
        };

        console.log(advancedFilterModel);

        // Apply the filter to the data
        const filtered = data.filter((row) => evaluateCondition(advancedFilterModel, row));
        console.log(filtered);
        setFilteredData(filtered);
    };




    return (
        <section className="min-h-screen flex flex-col gap-5 items-center justify-center">
            <div className="p-4">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mb-2 mr-2 block w-full"
                >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>

                <button
                    onClick={addCondition}
                    className="mb-2 mr-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                    Add Condition
                </button>

                {conditions.map((condition, index) => (
                    <div key={index} className="mb-4">
                        <select
                            value={condition.colId}
                            onChange={(e) => handleConditionChange(index, 'colId', e.target.value)}
                            className="mb-2 mr-2 block w-full"
                        >
                            <option value="">Select Column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>
                                    {column.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={condition.type}
                            onChange={(e) => handleConditionChange(index, 'type', e.target.value)}
                            className="mb-2 mr-2 block w-full"
                        >
                            <option value="">Select Method</option>
                            {methods.map((method) => (
                                <option key={method.key} value={method.key}>
                                    {method.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            value={condition.filter}
                            onChange={(e) => handleConditionChange(index, 'filter', e.target.value)}
                            className="mb-2 mr-2 block w-full"
                        />

                        <button
                            onClick={() => removeCondition(index)}
                            className="block bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    onClick={applyFilter}
                    className="block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Apply Filter
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.title}</td>
                                <td>{row.category}</td>
                                <td>{row.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdvancedFilter;