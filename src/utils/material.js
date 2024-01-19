

const actions = [
    {
        id: 'deleteSelected',
        label: 'Delete selected',
        className: 'your-button-styles',
        icon: (
            <svg
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
            </svg>
        ),
    },
    // {
    //     id: 'exportCSV',
    //     label: 'Export CSV',
    //     className: 'your-button-styles',
    //     icon: (
    //         <svg
    //             className="-ml-1 mr-1.5 w-5 h-5"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //             aria-hidden="true"
    //         >
    //         </svg>
    //     ),
    // },
];

const brands = [
    { id: 'apple', label: 'Apple', count: 56 },
    { id: 'fitbit', label: 'Microsoft', count: 16 },
    { id: 'razor', label: 'Razor', count: 49 },
    { id: 'nikon', label: 'Nikon', count: 12 },
    { id: 'benq', label: 'BenQ', count: 74 },
];

const columnLabels = {
    productName: 'Product name',
    category: 'Category',
    brand: 'Brand',
    description: 'Description',
    price: 'Price',
};




let toastMessage = {
    "CREATE_PRODUCT": "Product successfully created.",
    "DELETE_MULTI_PRODUCT": "Selected products successfully deleted.",
    "DELETE_PRODUCT": "Product successfully deleted.",
    "FETCH_PRODUCTS": "Products successfully retrieved.",
    "UPDATE_PRODUCT": "Product information successfully updated."
};


const buttonStyles = "w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";




export { actions, brands, columnLabels, buttonStyles, toastMessage }



