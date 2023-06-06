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