import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCustomStyles from "../components/useCustomStyles";
import CustomInput from "../components/CustomInput";
import { Alert, Button, CircularProgress, useTheme } from "@mui/material";
import { fetchUser, register } from "../common/action/authAction";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CommonSection from "../components/commonSection";
import { pink } from "@mui/material/colors";
import Theme from "../assets/css/theme";
import { useNavigate } from "react-router-dom";

const styles = (theme) => ({
  container: {
    padding: "40px",
    background: `linear-gradient(-20deg,${Theme.COLOR_THEME_TWO} 0%, ${Theme.COLOR_THEME_ONE} 100%)`,
  },
  contents: {
    position: "relative",
    top: "0px",
    width: "100%",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    background: "rgba(255, 255, 255, 0.1)",
    color: Theme.COLOR_THEME_THREE,
    padding: "20px",
    borderRadius: "20px",
    width: "50%",
    maxWidth: "500px",
    "@media (max-width: 900px)": {
      width: "70%",
      maxWidth: "70%",
    },
    "@media (max-width: 600px)": {
      width: "100%",
      maxWidth: "100%",
    },
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
    width:"100%"
  },
  eachInput:{
    width:"60%"
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

export default function SignUp() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    proflePic: "",
    address:""
  });

  const [isBuyer, setIsBuyer] = useState(false);

  const onInputChange = (event) => {
    if (event.target.id === 'userName'||event.target.id === 'email') {
      const trimmedValue = event.target.value.trim();
      const sanitizedValue = trimmedValue.replace(/\s+/g, '');
      setData({ ...data, [event.target.id]: sanitizedValue });
    } 
    else if(event.target.id === 'address') {
      setData({ ...data, [event.target.id]: event.target.value });
    }
    else setData({ ...data, [event.target.id]: event.target.value.trim() });
  };
  const [unFieldComponents, setUnFieldComponents] = useState({
    email: false,
    firstName: false,
    lastName: false,
    userName: false,
    address:"",
    password: false,
    confirmPassword: false,
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.trim()) {
      return false;
    }
    return emailRegex.test(email.toLowerCase());
  }

  function isPasswordConfirmed() {
    if (
      data.password &&
      data.confirmPassword &&
      data.confirmPassword === data.password
    )
      return true;
    return false;
  }

  useEffect(() => {
    if (isValidEmail(data.email))
      setUnFieldComponents((e) => ({ ...e, email: false }));
    if (data.userName) setUnFieldComponents((e) => ({ ...e, userName: false }));
    if (data.address) setUnFieldComponents((e) => ({ ...e, address: false }));
    if (data.firstName)
      setUnFieldComponents((e) => ({ ...e, firstName: false }));
    if (data.lastName) setUnFieldComponents((e) => ({ ...e, lastName: false }));
    if (data.password) setUnFieldComponents((e) => ({ ...e, password: false }));
    if (data.confirmPassword && isPasswordConfirmed())
      setUnFieldComponents((e) => ({ ...e, confirmPassword: false }));
  }, [data]);

  function signUp() {
    if (!data.firstName)
      return setUnFieldComponents((e) => ({ ...e, firstName: true }));
    if (!data.lastName)
      return setUnFieldComponents((e) => ({ ...e, lastName: true }));
    if (!isValidEmail(data.email))
      return setUnFieldComponents((e) => ({ ...e, email: true }));
    if (!data.userName)
      return setUnFieldComponents((e) => ({ ...e, userName: true }));
    if (!data.address)
      return setUnFieldComponents((e) => ({ ...e, address: true }));
    if (!data.password)
      return setUnFieldComponents((e) => ({ ...e, password: true }));
    if (!data.confirmPassword || !isPasswordConfirmed())
      return setUnFieldComponents((e) => ({ ...e, confirmPassword: true }));
    
      data['isBuyer']=isBuyer
     dispatch(register(data));
     setTimeout(()=>{
       dispatch(fetchUser())
     },7000)
  }

  return (
    <div className={classes?.container}>
      <CommonSection />
      <div className={classes?.contents}>
        <div className={classes?.box}>
          <h1 className={classes?.title}>Sign Up</h1>
         
          
          <div className={classes?.form}>
            <div className={classes?.eachInput}>
              <CustomInput
                id="firstName"
                labelText="First Name"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.firstName}
                required={true}
                value={data.firstName}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                }}
                color="white"
                onChange={onInputChange}
              />
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="lastName"
                labelText="Last Name"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.lastName}
                required={true}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                }}
                color="white"
                value={data.lastName}
                onChange={onInputChange}
              />
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="email"
                labelText="Email"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.email}
                required={true}
                value={data.email}
                onChange={onInputChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                }}
                color="white"
              />
              <p style={{fontSize:"12px",paddingLeft:"10px",opacity:0.7}}>eample@example.com</p>
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="userName"
                labelText="Username"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.userName}
                required={true}
                value={data.userName}
                onChange={onInputChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                }}
                color="white"
              />
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="address"
                labelText="Address"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.address}
                required={true}
                value={data.address}
                onChange={onInputChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "address",
                }}
                color="white"
              />
              <p style={{fontSize:"12px",paddingLeft:"10px",opacity:0.7}}>Addis Ababa, Ethiopia</p>

            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="password"
                labelText="Password"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.password}
                required={true}
                value={data.password}
                onChange={onInputChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                }}
                color="white"
              />
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="confirmPassword"
                labelText="Confrm Password"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.confirmPassword}
                required={true}
                value={data.confirmPassword}
                onChange={onInputChange}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                }}
                color="white"
              />
            </div>

            <div className={classes?.eachInput}>
              <CustomInput
                id="proflePic"
                labelText="Profle Picture ( image url )"
                labelColor="rgba(255, 255, 255, 0.7"
                error={unFieldComponents.proflePic}
                required={false}
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "text",
                }}
                color="white"
                value={data.proflePic}
                onChange={onInputChange}
              />
            </div>

            <div className={classes?.eachInput}>
              <FormControlLabel
                style={{ color: "rgba(255, 255, 255, 0.7" }}
                required
                control={
                  <Checkbox
                    value={isBuyer}
                    onChange={(e) => setIsBuyer(e.target.checked)}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label="I am Buyer"
              />
            </div>

            <div>
              {auth.loading ? (
                <CircularProgress size={25} />
              ) : (
                <Button className={classes?.button} onClick={signUp}>
                  Submit
                </Button>
              )}
            </div>
            {auth.error && (
              <div style={{ color: "red", width: "100%", fontSize: "12px" }}>
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
              Already have an account ?{" "}
              <a style={{ cursor: "pointer", color: "#c48f8f" }} href="/logIn">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
