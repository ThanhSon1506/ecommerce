import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
});

export default rootReducer;
