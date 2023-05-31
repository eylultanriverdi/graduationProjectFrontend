import { ActionTypes } from "../redux/contants/action-types";
import { getProduct } from "../api/user";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const res = await getProduct();
      if (res && res.status === 200) {
        dispatch({
          type: ActionTypes.SET_PRODUCTS,
          payload: res.data,
        });
      }
    } catch (error) {
    }
  };
};
