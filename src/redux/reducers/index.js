import { combineReducers } from "redux";
import { productReducer , calorieInfoReducer, calorieInfoListReducer, categoryListReducer, userRegisterReducer, userSignReducer, userInfoReducer} from "./productReducer";


const reducers = combineReducers({
    allProducts: productReducer,
    calorieInfo: calorieInfoReducer,
    calorieInfoList: calorieInfoListReducer,
    categoryList: categoryListReducer,
    userRegister: userRegisterReducer,
    userSignIn: userSignReducer,
    userInfoToken: userInfoReducer
})

export default reducers;