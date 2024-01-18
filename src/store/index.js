// store.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { createLogger } from "redux-logger";
import asyncActionCreator from './middleware/asyncActionCreator';
import { productReducer } from './reducers/product';

const logger = createLogger({
  collapsed: true,
});

const emptyMiddleWare = function fn1() {
  return function fun2(next) {
    return function fun3(action) {
      return next(action);
    };
  };
};

let loggerMiddleWare = emptyMiddleWare;

if (global.window) {
  loggerMiddleWare = logger;
}



const rootReducer = combineReducers({
  product: productReducer,

});


const store = createStore(rootReducer, applyMiddleware(asyncActionCreator,thunk,loggerMiddleWare));

export const RootState = store.getState()
export const AppDispatch = store.dispatch


export default store;
