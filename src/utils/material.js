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


const buttonStyles = "w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-sky-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";


const getColumnValue = (column) => {
    switch (column) {
        case 'productName':
            return "title";
        case 'category':
            return "category";
        case 'brand':
            return "brand";
        case 'description':
            return "description";
        case 'price':
            return "price";
        default:
            return '';
    }
};


export { actions, columnLabels, buttonStyles, toastMessage, getColumnValue }



