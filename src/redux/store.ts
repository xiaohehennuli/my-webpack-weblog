/*
 ** src/redux/store.ts
 */
 import { createStore, applyMiddleware } from "redux";
 import { composeWithDevTools } from 'redux-devtools-extension'
 //引入可视化工具

 import thunk from "redux-thunk";
 
 import rootReducer from "../redux/reducer/index";
 
 const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

 export default store;
 