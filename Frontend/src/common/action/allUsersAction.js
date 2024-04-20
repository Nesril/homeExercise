
import {
FETCH_ALL_USER,
FETCH_ALL_USER_SUCCESS,
FETCH_ALL_USER_FAILED

} from "../store/types";

export const fetchUserAllUsers = (data) => async (dispatch) => {
    try {
      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
  
      dispatch({
        type: FETCH_ALL_USER,
        payload: authToken,
      });
  
  
      if (authToken) {
        const {limit,page} = data
  
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/fetch/dummy/user-v2?page=${page}&&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const users = await response.json();
        if (users.users&&users.users.length>0) {
          dispatch({ type: FETCH_ALL_USER_SUCCESS, payload: users });
        } else {
          if(users?.errors?.name==='JsonWebTokenError'||users?.error?.error==='User not registered'){
            dispatch({ type: FETCH_ALL_USER_FAILED, payload: null });
          }
          else  dispatch({ type: FETCH_ALL_USER_FAILED, payload: users });
        }
      } else {
        dispatch({
          type: FETCH_ALL_USER_FAILED,
          payload: null ,
        });
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({ type: FETCH_ALL_USER_FAILED, payload: { error: "Error occured" } });
    }
  };
  