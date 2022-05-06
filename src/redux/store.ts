/*
 ** src/redux/store.ts
 */
 import { createStore, applyMiddleware } from "redux";
 import { composeWithDevTools } from 'redux-devtools-extension'
 //引入可视化工具

 import thunk from "redux-thunk";
 
 import rootReducer from "../redux/reducer/index";

 // redux-thunk是使redux支持异步action的插件

 // redux applyMiddleware用来注册插件的方法
 const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

 export default store;
 