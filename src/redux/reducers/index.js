import { combineReducers } from "redux";
import { productReducer , calorieInfoReducer} from "./productReducer";


const reducers = combineReducers({
    allProducts: productReducer,
    calorieInfo: calorieInfoReducer
})

export default reducers;