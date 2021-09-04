import axios from "axios";
import {
  LOGIN_USER,
  LOGIN_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  GET_USER,
  LOGOUT,
} from "../types";
import jwt_decode from "jwt-decode";

export const loginUser = (userBody) => async (dispatch) => {
  const obj = {
    username: userBody.username,
    password: userBody.password,
  };

  try {
    let res = await axios.post("http://localhost:3001/users", obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status && res.data.status === 401) {
      dispatch({ type: LOGIN_ERROR, payload: res.data.message });
      setTimeout(() => {
        dispatch({ type: CLEAR_ERROR });
      }, 3000);
    }
    dispatch({ type: LOGIN_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_ERROR });
  }
};

export const registerUser = (user) => async (dispatch) => {
  const obj = {
    username: user.username,
    password: user.password,
  };

  try {
    let res = await axios.post("http://localhost:3001/users/register", obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: REGISTER_USER, payload: res.data });
  } catch (error) {}
};

export const getUser = (token) => async (dispatch) => {
  let decodedUser = jwt_decode(token);

  try {
    let res = await axios.get(
      `http://localhost:3001/users/${decodedUser.foundUser.user_id}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  } catch (error) {}
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
