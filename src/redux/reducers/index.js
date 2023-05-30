import { combineReducers } from "redux";
import { productReducer , selectedProductReducer} from "./productReducer";
import products from "./products";

const reducers = combineReducers({
    allProducts: productReducer,
    product : selectedProductReducer,
    products: products
})

export default reducers;