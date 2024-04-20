import {
  FETCH_ALL_USER,
  FETCH_ALL_USER_SUCCESS,
  FETCH_ALL_USER_FAILED,
} from "../store/types";

const INITIAL_STATE = {
  info: null,
  loading: true,
  error: null,
  users: null,
};

export const allUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_USER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
        info: null,
      };
    case FETCH_ALL_USER_FAILED:
      return {
        ...state,
        users: null,
        info: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
