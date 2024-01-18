import { handleData } from "../middleware/handleData";
import Types from "../types/product";

const initialProductState = {
    products: [],
    loading: false,
    error: null,
};





export const productReducer = (state = initialProductState, action) => {
    const { type, payload, meta } = action;
    // console.log(meta?.lifecycle);

    switch (type) {
        case Types.FETCH_PRODUCTS:
            return handleData(state, action, {
                request: (prevState) => ({ ...prevState, loading: true, error: null }),
                success: (prevState) => ({
                    ...prevState,
                    products: payload.product,
                    loading: false
                }),
                failure: (prevState) => ({ ...prevState, loading: false, error: action.payload }),
            });


        default:
            return state;
    }
};





