import { combineReducers } from "redux";
import { productReducer , calorieInfoReducer, calorieInfoListReducer} from "./productReducer";


const reducers = combineReducers({
    allProducts: productReducer,
    calorieInfo: calorieInfoReducer,
    calorieInfoList: calorieInfoListReducer
})

export default reducers;