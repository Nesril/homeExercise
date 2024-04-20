import React from "react";
import logo from "../../assets/img/logo.png";
import { Button, IconButton, Link, Tooltip, useTheme } from "@mui/material";
import useCustomStyles from "../useCustomStyles";
import Theme from "../../assets/css/theme";
import { useDispatch, useSelector } from "react-redux";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
const styles = (theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: theme.secondaryColor,
    width: "95%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "transparent",
    height: "fit-content",
    zIndex: 20,
    marginTop: "7px",
  },
 
  iconColor: {
    color: "white",
    fontSize: "34px",
  },

});

export default function Header() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
   const dispatch = useDispatch()


  return (
    <div className={classes?.header}>
      <div>
        <Link href="/">
          <img
            src={logo}
            style={{ width: "100%", height: "65px", objectFit: "cover" }}
            alt="logo.pic"
          />
        </Link>
      </div>
     
      <div>
         <Link href="/profile">
             <Tooltip title='Profile'>
                <IconButton>
                    <PersonIcon className={classes?.iconColor}/>
                </IconButton>

             </Tooltip>
        </Link>
      </div>
    </div>
  );
}
