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