import { ActionTypes } from "../contants/action-types";
const initialState = {
    products: [],
    calorieInfo: []
}

export const productReducer = (state = initialState.products, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload}
        default:
            return state
    }
}

export const calorieInfoReducer = (state = initialState.calorieInfo, { type, payload }) => {
    switch (type) {
        case ActionTypes.CREATE_CALORIE_INFO:
            return { ...state, calorieInfo: payload}
        default:
            return state
    }
}


export const calorieInfoListReducer = (state = initialState.calorieInfo, { type, payload }) => {
    switch (type) {
        case ActionTypes.CALORIE_INFO_LIST:
            return { ...state, products: payload}
        default:
            return state
    }
}
