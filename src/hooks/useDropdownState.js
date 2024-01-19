import { useState } from "react";

export const useDropdownState = () => {
    const [dropdownStates, setDropdownStates] = useState({
        showActionsDropdown: false,
        showFilterDropdown: false,
        showColDropdown: false,
    });

    const handleDropdownClick = (dropdownName) => {
        setDropdownStates((prevStates) => {
            const updatedStates = Object.fromEntries(
                Object.keys(prevStates).map((name) => [name, name === dropdownName ? !prevStates[name] : false])
            );
            return {
                ...prevStates,
                ...updatedStates,
            };
        });
    };

    return [dropdownStates, handleDropdownClick];
};

