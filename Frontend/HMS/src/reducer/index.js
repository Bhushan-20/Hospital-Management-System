import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;