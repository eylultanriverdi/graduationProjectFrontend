import { FETCH_PRODUCTS } from "./types";
import { getProduct } from "../api/user";

export const fetchProducts = (apiBaseUrl) => {
  return async (dispatch) => {
    try {
      const res = await getProduct(apiBaseUrl);
      if (res && res.status === 200) {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: res.data,
        });
      }
    } catch (error) {
      // Hata durumunu yönetmek için gerekli adımları burada gerçekleştirin
    }
  };
};
