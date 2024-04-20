import { useNavigate } from "react-router-dom";
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

  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  CLEAR_USER_PROFILE_UPDATE_STATUS

} from "../store/types";

export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGN_UP,
      payload: data,
    });

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    const user = await response.json();
    console.log(user);
    if (user.msg) {
      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: user });
      window.location.href='/logIn'
    } else {
      dispatch({ type: USER_SIGN_UP_FAILED, payload: user });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGN_UP_FAILED,
      payload: { error: "Error occured" },
    });
  }
};


export const logIn = (data) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP,
      payload: data,
    });

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    const user = await response.json();
    if (user.token) {
      const { token } = user;
      document.cookie = `authToken=${token}; path=/;`;
      dispatch({ type: VERIFY_OTP_SUCCESS, payload: user });
      window.location.href='/'
    } else {
      dispatch({ type: VERIFY_OTP_FAILED, payload: user });
    }
  } catch (error) {
    dispatch({ type: VERIFY_OTP_FAILED, payload: { error: "Error occured" } });
  }
};

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export const fetchUser = () => async (dispatch) => {
  try {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    dispatch({
      type: FETCH_USER,
      payload: authToken,
    });

    let userLocation={}
    await getCurrentLocation()
      .then((location) => {
        userLocation=location
      })
      .catch((error) => {
        //console.error('Error:', error.message);
      });

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/getUser?latitude=${userLocation.latitude}&&longitude=${userLocation.longitude}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const user = await response.json();
      if (user.userName) {
        dispatch({ type: FETCH_USER_SUCCESS, payload: user });
      } else {
        if(user?.errors?.name==='JsonWebTokenError'||user?.error?.error==='User not registered'){
          dispatch({ type: FETCH_USER_FAILED, payload: null });
        }
        else  dispatch({ type: FETCH_USER_FAILED, payload: user });
      }
    } else {
      dispatch({
        type: FETCH_USER_FAILED,
        payload: null ,
      });
    }
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILED, payload: { error: "Error occured" } });
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {

    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: data,
    });

    if (data._id) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/profile?id=${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      const user = await response.json();
      if (user.msg) {
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: user });
      } else {
         dispatch({ type: UPDATE_USER_PROFILE_FAILED, payload: user });
      }
    } else {
      dispatch({
        type: UPDATE_USER_PROFILE_FAILED,
        payload: null ,
      });
    }
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFILE_FAILED, payload: { error: "Error occured" } });
  }
};

export const clearUpdateStatus=()=>async(dispatch)=>{
    dispatch({
      type: CLEAR_USER_PROFILE_UPDATE_STATUS,
      payload: null,
    })
}
export const signOut = () => (dispatch) => {
  document.cookie = `authToken=; ${new Date()}; path=/;`;
  dispatch({ type: USER_SIGN_OUT });
};
