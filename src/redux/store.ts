/*
 ** src/redux/store.ts
 */
 import { createStore, compose, applyMiddleware } from "redux";
 //引入可视化工具

 import thunk from "redux-thunk";
 
 import rootReducer from "../redux/reducer/index";
 
 const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined));

 export default store;
 