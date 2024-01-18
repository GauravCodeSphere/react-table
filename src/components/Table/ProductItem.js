import InlineDropdown from './InlineDropdown';

const ProductItem = ({ selectedColumns, product }) => {

    const getColumnValue = (product, column) => {
        switch (column) {
            case 'productName':
                return product.title;
            case 'category':
                return product.category;
            case 'brand':
                return product.brand;
            case 'description':
                return product.description;
            case 'price':
                return product.price;
            default:
                return '';
        }
    };

    return (
        <tr className="border-b dark:border-gray-700 hover:bg-slate-100">

            {[...selectedColumns.keys()].map((column, columnIndex) => (
                selectedColumns.get(column) ? (
                    <td key={columnIndex} className="px-4 py-3">
                        {getColumnValue(product, column)}
                    </td>
                ) : null
            ))}
            <td className="px-4 py-3 flex items-center justify-end relative">
                <InlineDropdown />
            </td>
        </tr>
    );
}

export default ProductItem;
