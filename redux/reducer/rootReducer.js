import {combineReducers} from '@reduxjs/toolkit'
import user from "./user";
import requests from "./requests";
import errorHandlerReducer from "./errorHandlerReducer";


const rootReducer = combineReducers({
  [requests.name]: requests.reducer,
  [user.name]: user.reducer,
  [errorHandlerReducer.name]: errorHandlerReducer.reducer,
});


export default rootReducer;
