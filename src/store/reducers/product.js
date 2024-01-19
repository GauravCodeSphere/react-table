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

        case Types.DELETE_PRODUCT:

            return handleData(state, action, {
                request: (prevState) => ({ ...prevState, loading: true, error: null }),
                success: (prevState) => ({
                    ...prevState,

                    products: prevState.products.filter(product => product.id !== payload.productId),
                    loading: false
                }),
                failure: (prevState) => ({ ...prevState, loading: false, error: action.payload }),
            });

        case Types.DELETE_MULTI_PRODUCT:

            const updatedState = state.products.filter((item) => !payload.productIds.includes(item.id));
            const finalState = { ...state, products: updatedState }

            return finalState

        case Types.UPDATE_PRODUCT:

            return handleData(state, action, {
                request: (prevState) => ({ ...prevState, loading: true, error: null }),
                success: (prevState) => {
                    const updatedProducts = prevState.products.map(product => {
                        if (product.id === payload.productId) {
                            // Update the specific product with the new data from payload.updatedProduct
                            return { ...product, ...payload.updatedProduct };
                        }
                        return product;
                    });
                    return {
                        ...prevState,
                        products: updatedProducts,
                        loading: false
                    };
                },
                failure: (prevState) => ({ ...prevState, loading: false, error: action.payload }),
            });


        case Types.CREATE_PRODUCT:
            return handleData(state, action, {
                request: (prevState) => ({ ...prevState, loading: true, error: null }),
                success: (prevState) => ({
                    ...prevState,
                    products: [...prevState.products, payload.createdProduct],
                    loading: false,
                }),
                failure: (prevState) => ({ ...prevState, loading: false, error: action.payload }),
            });



        default:
            return state;
    }
};





