import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../store/actions';

const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const groupKey = item[key];
        const existingGroup = result[groupKey];

        if (existingGroup) {
            existingGroup.push(item);
            existingGroup.totalPrice += item.price;
        } else {
            result[groupKey] = [item];
            result[groupKey].totalPrice = item.price;
        }

        return result;
    }, {});
};

const GroupedView = () => {
    const [groupedView, setGroupedView] = useState(false);
    const [groupedData, setGroupedData] = useState(null);
    const [groupingKey, setGroupingKey] = useState('category'); // Default grouping key
    const [expandedGroups, setExpandedGroups] = useState([]);

    const userData = useSelector((state) => state.product.products);
    const { fetchProducts } = useActions();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        // Dynamically group the data when groupingKey changes
        if (groupedView && groupingKey && userData) {
            const groupedData = groupBy(userData, groupingKey);
            setGroupedData(groupedData);
        }
    }, [groupingKey, groupedView, userData]);

    const toggleView = () => {
        setGroupedView(!groupedView);
    };

    const handleGroupingChange = (event) => {
        setGroupingKey(event.target.value);
    };

    const toggleGroup = (groupName) => {
        setExpandedGroups((prevExpandedGroups) => {
            if (prevExpandedGroups.includes(groupName)) {
                return prevExpandedGroups.filter((group) => group !== groupName);
            } else {
                return [...prevExpandedGroups, groupName];
            }
        });
    };

    const groupingOptions = ['category', 'brand'];

    return (
        <div className="container mx-auto px-4 mt-5">
            <div className="mb-4">
                <button
                    onClick={toggleView}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                >
                    {groupedView ? 'Show Default View' : 'Show Grouped View'}
                </button>

                {groupedView && (
                    <div>
                        <label htmlFor="groupingKey" className="mr-2">
                            Group By:
                        </label>
                        <select
                            id="groupingKey"
                            value={groupingKey}
                            onChange={handleGroupingChange}
                            className="border border-gray-300 rounded-md py-1 px-2"
                        >
                            {groupingOptions.map((option) => (
                                <option key={option} value={option} className="text-black">
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {groupedView ? (
                <div className="mb-4">
                    <table className="w-full border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groupedData &&
                                Object.entries(groupedData).map(([groupName, groupData], index) => (
                                    <>
                                        <>
                                            <tr>
                                                <td className="px-4 py-3 text-center" >
                                                    {index + 1}

                                                </td>
                                                <td className="px-4 py-3 text-center" onClick={() => toggleGroup(groupName)}>
                                                    {groupName} ({groupData.length})

                                                </td>
                                            </tr>
                                            {expandedGroups.includes(groupName) && (
                                                <>
                                                    {groupData.map((user) => (
                                                        <tr
                                                            key={user.id}
                                                            className="border-b dark:border-gray-700 hover:bg-slate-100"
                                                        >

                                                            <td className="px-4 py-3"></td>
                                                            <td className="px-4 py-3"></td>
                                                            <td className="px-4 py-3 text-center">{user.title}</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            )}
                                        </  >

                            {/* <tfoot> */}
                                <tr className='flex'>
                                    <td className="border border-gray-300 py-1 px-2">
                                        Total Price: {groupData.totalPrice.toFixed(2)}
                                    </td>
                                </tr>
                            {/* </tfoot> */}
                                    </>

                                ))}
                        </tbody>
                    </table>
                </div>
            )
                :
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 py-1 px-2">ID</th>
                            <th className="border border-gray-300 py-1 px-2">Name</th>
                            <th className="border border-gray-300 py-1 px-2">
                                {groupingKey.charAt(0).toUpperCase() + groupingKey.slice(1)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 py-1 px-2">{user.id}</td>
                                <td className="border border-gray-300 py-1 px-2">{user.title}</td>
                                <td className="border border-gray-300 py-1 px-2">{user[groupingKey]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </div>
    );
};

export default GroupedView;
