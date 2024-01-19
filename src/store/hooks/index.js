import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppSelector = useSelector;

const useReducerData = (
  reducerName,
  attr,
  defaultValue,
) => {
  return useSelector(
    (state) => state?.[reducerName]?.[attr] || defaultValue,
  );
};

const useStoreActions = (actions) => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actions || {}, dispatch),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actions],
  );
};

export { useStoreActions, useReducerData, useAppSelector };








// const products = useReducerData("productReducer", "products", []);