import React, { useEffect, useState } from "react";
import CommonSection from "../components/commonSection";
import Theme from "../assets/css/theme";
import {
  Alert,
  Button,
  CircularProgress,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import useCustomStyles from "../components/useCustomStyles";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import {
  fetchUser,
  logIn,
} from "../common/action/authAction";
import { useDispatch, useSelector } from "react-redux";

const styles = (theme) => ({
  container: {
    background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
    minHeight:"100vh"
  },
  contents: {
    position: "relative",
    top: "100px",
    width: "100%",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  box: {
    background: "rgba(255, 255, 255, 0.1)",
    color: Theme.COLOR_THEME_THREE,
    padding: "20px",
    borderRadius: "20px",
    width: "50%",
    maxWidth: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },
  button: {
    marginTop: "13px",
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
      opacity: 0.7,
    },
  },
});

export default function SignIn() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [unFieldComponents, setUnFieldComponents] = useState({
    email: false,
    password: false,
  });

  let navigate = useNavigate()

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      return false;
    }
    return emailRegex.test(email.toLowerCase());
  }

  useEffect(() => {
    if (isValidEmail(email))
      setUnFieldComponents((e) => ({ ...e, email: false }));
    if(password)
       setUnFieldComponents((e) => ({ ...e, password: false }));
  }, [email]);

  function submiteData() {
    if (!isValidEmail(email))
      return setUnFieldComponents((e) => ({ ...e, email: true }));

      if(!password)
         setUnFieldComponents((e) => ({ ...e, password: false }));

    const dataToBePassed = {
      email: email,
      password:password
    };
    dispatch(logIn(dataToBePassed));
  }
  
  return (
    <div className={classes?.container}>
      <CommonSection />
      <div className={classes?.contents}>
        <div className={classes?.box}>
          <>
            <h1 className={classes?.title}>Sign In</h1>
            <div className={classes?.form}>
              <div>
                <CustomInput
                  id="email"
                  labelText="Email"
                  labelColor="rgba(255, 255, 255, 0.7"
                  error={unFieldComponents.email}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                  }}
                  color="white"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </div>

              <div>
                <CustomInput
                  id="password"
                  labelText="Password"
                  required={true}
                  labelColor="rgba(255, 255, 255, 0.7"
                  error={unFieldComponents.password}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "email",
                  }}
                  color="white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </div>


              <div>
                {auth.loading ? (
                  <CircularProgress size={25} />
                ) : (
                  <Button className={classes?.button} onClick={submiteData}>
                    Submit
                  </Button>
                )}
              </div>

              {auth.error && (
                <div
                  style={{
                    color: "red",
                    width: "100%",
                    fontSize: "12px",
                  }}
                >
                  <Alert
                    severity="error"
                    style={{
                      fontSize: "12px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                    }}
                  >
                    {auth?.error?.error}
                  </Alert>
                </div>
              )}

              <p style={{ fontSize: "12px" }}>
                Dont have an account ?{" "}
                <a
                  style={{ cursor: "pointer", color: "#c48f8f" }}
                  href="/signUp"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </>
              
        </div>
      </div>
    </div>
  );
}

