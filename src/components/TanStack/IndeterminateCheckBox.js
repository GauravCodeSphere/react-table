import { Checkbox } from "@mui/material";
import { useEffect, useRef } from "react";

function IndeterminateCheckBox({ indeterminate, ...rest }) {
    const ref = useRef(null);

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate])

    return <Checkbox type="checkbox" ref={ref} {...rest} size="small" />;
}

export default IndeterminateCheckBox;