import { ActionTypes } from "../contants/action-types";
const initialState = {
    products: [],
    calorieInfo: [],
    categoryList: [],
    userRegister: [],
    userSignIn: [],
    userInfoToken: [],
    nutritionistRegister: [],
    nutritionistSignIn: [],
    nutritionistInfoToken: [],
    nutritionistList: [],
    selectedNutritionist:[],
    selectedNutritionistList: []
}

export const productReducer = (state = initialState.products, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: payload }
        default:
            return state
    }
}

export const calorieInfoReducer = (state = initialState.calorieInfo, { type, payload }) => {
    switch (type) {
        case ActionTypes.CREATE_CALORIE_INFO:
            return { ...state, calorieInfo: payload }
        default:
            return state
    }
}

export const selectedNutritionistReducer = (state = initialState.selectedNutritionist, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_NUTRITIONIST:
            return { ...state, selectedNutritionist: payload }
        default:
            return state
    }
}

export const calorieInfoListReducer = (state = initialState.calorieInfo, { type, payload }) => {
    switch (type) {
        case ActionTypes.CALORIE_INFO_LIST:
            return { ...state, products: payload }
        default:
            return state
    }
}

export const categoryListReducer = (state = initialState.categoryList, { type, payload }) => {
    switch (type) {
        case ActionTypes.CATEGORY_LIST:
            return { ...state, categoryList: payload }
        default:
            return state
    }
}

export const nutritionistListReducer = (state = initialState.nutritionistList, { type, payload }) => {
    switch (type) {
        case ActionTypes.NUTRITIONIST_LIST:
            return { ...state, nutritionistList: payload }
        default:
            return state
    }
}

export const selectedNutritionistListReducer = (state = initialState.selectedNutritionistList, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_NUTRITIONIST_LIST:
            return { ...state, selectedNutritionistList: payload }
        default:
            return state
    }
}


export const userRegisterReducer = (state = initialState.userRegister, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER_REGISTER:
            return { ...state, userRegister: payload }
        default:
            return state
    }
}

export const nutritionistRegisterReducer = (state = initialState.nutritionistRegister, { type, payload }) => {
    switch (type) {
        case ActionTypes.NUTRITIONIST_REGISTER:
            return { ...state, nutritionistRegister: payload }
        default:
            return state
    }
}

export const userSignReducer = (state = initialState.userSignIn, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER_SIGNIN:
            return { ...state, userSignIn: payload }
        default:
            return state
    }
}

export const nutritionistSignReducer = (state = initialState.nutritionistSignIn, { type, payload }) => {
    switch (type) {
        case ActionTypes.NUTRITIONIST_SIGNIN:
            return { ...state, nutritionistSignIn: payload }
        default:
            return state
    }
}

export const userInfoReducer = (state = initialState.userInfoToken, action) => {
    switch (action.type) {
        case ActionTypes.USER_INFO:
            return action.payload; // Sadece payload'ı döndür
        default:
            return state;
    }
}

export const nutritionistInfoReducer = (state = initialState.nutritionistInfoToken, action) => {
    switch (action.type) {
        case ActionTypes.NUTRITIONIST_INFO:
            return action.payload;
        default:
            return state;
    }
}

