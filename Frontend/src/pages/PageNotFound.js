
import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';

export default function PageNotFound() {
  let location=useLocation()
let navigate = useNavigate()
const auth=useSelector(state=>state.auth)

useEffect(()=>{
    let route = location.pathname.split("/")
    console.log(route);
    if(auth?.info?.userName){
           if(route.length>1&&route[1]!=='profile'){
               navigate("/")
           }
    }
    else{
      if(route.length===1||route.length>2){
        navigate("/logIn")
      }
      if(route[1]!=="logIn" && route[1]!=="signUp"){
        navigate("/logIn")
    }
    }
},[])
  return (
    <div>
         404:Page Not Found
    </div>
  )
}
