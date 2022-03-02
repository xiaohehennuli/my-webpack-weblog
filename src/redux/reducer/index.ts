/*
 ** src/redux/rootReducer.ts
 */
 import { combineReducers } from "redux";
 import count from "./countReducer"
 
 const reducers = {count};

 export default combineReducers(reducers);
 