import * as productAction from "../actions/product";

import { useStoreActions } from "../hooks";


export const useActions = () => {
  return useStoreActions({
    ...productAction
  });
};  
