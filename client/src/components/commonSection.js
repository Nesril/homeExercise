import React from 'react'
import useCustomStyles from './useCustomStyles';
import curves2 from "../assets/img/curves2.png"
import Theme from '../assets/css/theme'
import { useTheme } from '@mui/material';

const styles = (theme) => ({
    topContainer: {
      height: '100vh',
      width: "100%",
      color: theme.secondaryColor,
      position:"absolute",
      top:0, 
      left:0,
      zIndex:1
    },
    leftCurve:{
       position:"absolute",
       top:"20px",
       right:"0px",
       transform:"rotateZ(180deg)"
    },
    rightCurve:{
      position:"absolute",
      top:"20px",
      left:"0px",
   },
   buttomCurve:{
     position:"absolute",
     bottom:"0px",
     left:"5px",
  },
   
  });

export default function CommonSection() {
    const theme = useTheme();
    const classes = useCustomStyles(styles, theme);
  return (
    <div>
         <div className={classes?.topContainer}>
            <div className={classes?.leftCurve}><img src={curves2}/></div>
            <div  className={classes?.buttomCurve}><img src={curves2}/></div>
         </div>
    </div>
  )
}
