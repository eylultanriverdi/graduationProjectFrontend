import { ActionTypes } from "../contants/action-types";
const initialState = {
    products: [],
    calorieInfo: [],
    categoryList: [],
    userRegister:[],
    userSignIn: [],
    userInfoToken :[]
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

export const categoryListReducer = (state = initialState.categoryList, { type, payload }) => {
    switch (type) {
      case ActionTypes.CATEGORY_LIST:
        return { ...state, categoryList: payload }
      default:
        return state
    }
  }

  export const userRegisterReducer = (state = initialState.userRegister, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER_REGISTER:
            return { ...state, userRegister: payload}
        default:
            return state
    }
}

export const userSignReducer = (state = initialState.userSignIn, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER_SINGIN:
            return { ...state, userSignIn: payload}
        default:
            return state
    }
}

export const userInfoReducer = (state = initialState.userInfoToken, { type, payload }) => {
    switch (type) {
      case ActionTypes.USER_INFO:
        return { ...state, userInfoToken: payload }
      default:
        return state
    }
  }
  
