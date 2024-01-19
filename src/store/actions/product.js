import toast from "react-hot-toast";
import Types from "../types/product"
import { toastMessage } from "../../utils/material";



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



export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: Types.DELETE_PRODUCT,
    payload: { productId },
    asyncCall: async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success(toastMessage[Types.DELETE_PRODUCT])
          return { status: 1, productId };
        } else {
          const data = await response.json();
          return { status: 0, error: data.error };
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        return { status: 0, error: error.message };
      }
    },
  });
};


export const deleteMultiProduct = (productIds) => async (dispatch) => {
  dispatch({
    type: Types.DELETE_MULTI_PRODUCT,
    payload: { productIds }
  });
};



export const updateProduct = (productId, updatedProduct) => async (dispatch) => {
  dispatch({
    type: Types.UPDATE_PRODUCT,
    payload: { productId, updatedProduct },

    asyncCall: async () => {
      try {

        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          toast.success(toastMessage[Types.UPDATE_PRODUCT])

          return { status: 1, productId, updatedProduct };
        } else {
          const data = await response.json();
          return { status: 0, error: data.error };
        }
      } catch (error) {
        console.error("Error updating product:", error);
        return { status: 0, error: error.message };
      }
    },
  });
};


export const createProduct = (newProduct) => async (dispatch) => {
  dispatch({
    type: Types.CREATE_PRODUCT,
    payload: { newProduct },

    asyncCall: async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const createdProduct = await response.json();
          toast.success(toastMessage[Types.CREATE_PRODUCT])
          return { status: 1, createdProduct };
        } else {
          const data = await response.json();
          return { status: 0, error: data.error };
        }
      } catch (error) {
        console.error('Error creating product:', error);
        return { status: 0, error: error.message };
      }
    },


  });
};






