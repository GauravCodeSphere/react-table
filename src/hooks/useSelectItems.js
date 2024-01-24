import { useState } from "react";
import { useActions } from "../store/actions";
import toast from "react-hot-toast";


export const useSelectItems = (getFilteredProductsByColumn) => {
    const { deleteMultiProduct } = useActions()

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);


    const handleCheckboxChange = (itemId) => {
        const isSelected = selectedItems.includes(itemId);

        if (isSelected) {
            setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== itemId));
        } else {
            setSelectedItems((prevSelected) => [...prevSelected, itemId]);
        }
    };

    const handleDelete = () => {
        if (selectedItems.length === 0) return toast("No selected item found")
        deleteMultiProduct(selectedItems);
        setSelectedItems([])
    };

    const handleSelectAllChange = () => {
        const allItems = getFilteredProductsByColumn().map(product => product.id);

        if (selectAllChecked) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allItems);
        }
        // Toggle the state of the checkbox
        setSelectAllChecked(prevState => !prevState);
    };


    return { selectedItems, setSelectedItems, selectAllChecked, handleCheckboxChange, handleDelete, handleSelectAllChange };
};