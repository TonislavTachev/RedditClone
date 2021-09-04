import {
  LOGIN_USER,
  LOGIN_ERROR,
  CLEAR_ERROR,
  REGISTER_USER,
  GET_USER,
  LOGOUT,
} from "../types";

const initialState = {
  user: null,
  isLoaded: false,
  error: "",
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoaded: true,
        isAuthenticated: true,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case GET_USER: {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }

    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }

    case CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
