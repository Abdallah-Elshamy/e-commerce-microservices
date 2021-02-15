import Axios from "axios";
import { apiEndpoint } from "../config";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from "../constants/orderConstants.js";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userLogin: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await Axios.post(apiEndpoint + "orders", order, {
      headers: {
        Authorization: " Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

export { createOrder };
