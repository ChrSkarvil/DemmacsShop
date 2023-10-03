import handleCart from "./handleCart";
import authReducer, { authSliceName } from './authSlice';

import { combineReducers } from "redux";

const rootReducers = combineReducers ({
    [authSliceName]: authReducer,
    handleCart,
})

export default rootReducers;