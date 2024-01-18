import Types from "../types/product"



export const fetchProducts = () => async (dispatch) => {
    dispatch({
        type: Types.FETCH_PRODUCTS,
        payload: {},
        asyncCall: async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=100&delay=1000');
                const data = await response.json();
                const product = data.products
                return { status: 1, product };

            } catch (error) {
                console.error("Error fetching initial cart items:", error);
                return { status: 0, error: error.message };
            }
        },
        //   onSuccess: (dispatch, result) => { },
    });
};







