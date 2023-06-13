import { combineReducers } from "redux";
import { productReducer , calorieInfoReducer, calorieInfoListReducer, categoryListReducer, userRegisterReducer, userSignReducer, userInfoReducer, nutritionistRegisterReducer, nutritionistSignReducer, nutritionistInfoReducer, nutritionistListReducer, selectedNutritionistReducer, selectedNutritionistListReducer} from "./productReducer";


const reducers = combineReducers({
    allProducts: productReducer,
    calorieInfo: calorieInfoReducer,
    calorieInfoList: calorieInfoListReducer,
    categoryList: categoryListReducer,
    userRegister: userRegisterReducer,
    userSignIn: userSignReducer,
    userInfoToken: userInfoReducer,
    nutritionistRegister: nutritionistRegisterReducer,
    nutritionistSignIn : nutritionistSignReducer,
    nutritionistInfoToken : nutritionistInfoReducer,
    nutritionistList : nutritionistListReducer,
    selectedNutritionist: selectedNutritionistReducer,
    selectedNutritionistList: selectedNutritionistListReducer
})

export default reducers;