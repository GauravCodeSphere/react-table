import InlineDropdown from './InlineDropdown';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ProductImage = ({ src }) => (
    <div style={{ width: '100%', height: '150px' }} className='rounded-lg overflow-hidden shadow-md'>

        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='rounded-lg' />
    </div>
);

const ProductInfoItem = ({ label, value }) => (
    <div className='bg-white rounded-lg p-3 text-black shadow-md'>
        <div>{label}</div>
        <div>{value}</div>
    </div>
);

const ExpandableRow = ({ product, selectedColumns }) => {
    const { images, stock, rating, discountPercentage, price } = product;

    return (
        <tr className="border-b dark:border-gray-700 bg-slate-100">
            <td colSpan={selectedColumns.size + 2} className="px-4 py-7 ">
                <div className="grid grid-cols-4 gap-4">
                    {images.slice(0, 4).map((image, index) => (
                        <ProductImage key={index} src={image} />
                    ))}
                </div>
                <div className='grid grid-cols-4 gap-4 mt-5'>
                    <ProductInfoItem label="Stock" value={stock} />
                    <ProductInfoItem label="Rating" value={rating} />
                    <ProductInfoItem label="Discount Percentage" value={discountPercentage} />
                    <ProductInfoItem label="Price" value={`$${price}`} />
                </div>
            </td>
        </tr>
    );
};

const ProductItem = ({ selectedColumns, product, handleCheckboxChange, selectedItems, toggleExpanded, expanded }) => {

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
        <>
            <tr className="border-b dark:border-gray-700 hover:bg-slate-100" >
                <td className="px-4 py-3 flex items-center justify-end relative">
                    <button onClick={toggleExpanded}>
                        {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                    <td className="px-4 py-3 flex items-center justify-end relative">
                        <input
                            id={`checkbox-${product.id}`}
                            type="checkbox"
                            defaultValue=""
                            checked={selectedItems.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                    </td>
                </td>

                {[...selectedColumns.keys()].map((column, columnIndex) => (
                    selectedColumns.get(column) ? (
                        <td key={columnIndex} className="px-4 py-3">
                            {getColumnValue(product, column)}
                        </td>
                    ) : null
                ))}
                <td className="px-4 py-3 flex items-center justify-end relative">
                    <InlineDropdown product={product} />
                </td>
            </tr>
            {/* Expanded row */}
            {expanded && <ExpandableRow product={product} selectedColumns={selectedColumns} />}
        </>
    );
}

export default ProductItem;
