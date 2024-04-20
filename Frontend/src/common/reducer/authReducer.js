import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  USER_SIGN_UP,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILED,
  VERIFY_OTP,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_SUCCESS,
  USER_SIGN_OUT,
  USER_DELETED,

  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  CLEAR_USER_PROFILE_UPDATE_STATUS,
} from "../store/types";

const INITIAL_STATE = {
  info: null,
  loading: true,
  error: null,
  token: null,
};

export const authreducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      return {
        ...state,
        loading: true,
      };
    case USER_SIGN_UP_FAILED:
      return {
        ...state,
        info: null,
        loading: false,
        error: action.payload,
      };
    case USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        info: action.payload,
        loading: false,
        error: null,
      };

    case VERIFY_OTP:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_OTP_FAILED:
      return {
        ...state,
        info: null,
        loading: false,
        error: action.payload,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        info: null,
        loading: false,
        token: action.payload,
        error: null,
      };

    case FETCH_USER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        info: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };

    case USER_SIGN_OUT:
      return INITIAL_STATE;

    case USER_DELETED:
      return INITIAL_STATE;

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updating: false,
      };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        updateInfo: action.payload,
        updateError: null,
        updating:false
      };

    case UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        updateInfo:null,
        updateError:  action.payload,
        updating:false
      };

    case CLEAR_USER_PROFILE_UPDATE_STATUS:
      return {
        ...state,
        updateInfo:null,
        updateError:  null,
        updating:false
      };

    default:
      return state;
  }
};
