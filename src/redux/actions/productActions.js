import { ActionTypes } from "../contants/action-types"

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products,
    }
}

export const createCalorieInfo = (calorieInfo) => {
    return {
        type: ActionTypes.CREATE_CALORIE_INFO,
        payload: calorieInfo,
    }
}

export const createNutritionistSelected = (selectedNutritionist) => {
    return {
        type: ActionTypes.SELECTED_NUTRITIONIST,
        payload: selectedNutritionist,
    }
}

export const setCalorieInfoList = (calorieInfo) => {
    return {
        type: ActionTypes.CALORIE_INFO_LIST,
        payload: calorieInfo,
    }
}

export const setCategoryList = (categoryList) => {
    return {
        type: ActionTypes.CATEGORY_LIST,
        payload: categoryList,
    }
}

export const setNutritionistList = (nutritionistList) => {
    return {
        type: ActionTypes.NUTRITIONIST_LIST,
        payload: nutritionistList,
    }
}

export const setSelectedNutritionistList = (selectedNutritionistList) => {
    return {
        type: ActionTypes.SELECTED_NUTRITIONIST_LIST,
        payload: selectedNutritionistList,
    }
}

export const createUser = (userRegister) => {
    return {
        type: ActionTypes.USER_REGISTER,
        payload: userRegister,
    }
}

export const createNutritionist = (nutritionistRegister) => {
    return {
        type: ActionTypes.NUTRITIONIST_REGISTER,
        payload: nutritionistRegister,
    }
}

export const createSignIn = (userSignIn) => {
    return {
        type: ActionTypes.USER_SIGNIN,
        payload: userSignIn,
    }
}

export const createSignInNutritionist = (nutritionistSignIn) => {
    return {
        type: ActionTypes.NUTRITIONIST_SIGNIN,
        payload: nutritionistSignIn,
    }
}

export const setUserInfo = (userID) => {
    return {
      type: ActionTypes.USER_INFO,
      payload: userID,
    }
  }

  export const setNutritionistInfo = (nutritionistID) => {
    return {
      type: ActionTypes.NUTRITIONIST_INFO,
      payload: nutritionistID,
    }
  }