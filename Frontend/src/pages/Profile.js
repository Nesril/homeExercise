import React, { useEffect, useState } from 'react'
import CommonSection from '../components/commonSection'
import Header from '../components/Header/Header'
import { Box, useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import Theme from '../assets/css/theme';
import useCustomStyles from '../components/useCustomStyles';
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import moment from 'moment'
import { Alert, Button, CircularProgress, IconButton, Modal, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomInput from '../components/CustomInput';
import { clearUpdateStatus, fetchUser, signOut, updateUser } from '../common/action/authAction';

const styles = (theme) => ({
  container: {
    background: `linear-gradient(-90deg,${Theme.COLOR_THEME_TWO} 10%, rgba(105, 179, 110) 100%)`,
    minHeight: "100vh",
    padding: "120px 0px 0px 0px",
  },
  homePage: {
    position: "relative",
    top: "0px",
    width: "100%",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
  },
  box:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
    background: "rgba(255, 255, 255, 0.1)",
    color: Theme.COLOR_THEME_THREE,
    padding: "20px",
    borderRadius: "20px",
    width: "50%",
    overflow:"auto",
    maxWidth: "500px",
    "@media (max-width: 900px)": {
      width: "70%",
      maxWidth: "70%",
    },
    
  },
  dataContainer :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop:"15px"
 },
dataItem:{
    marginBottom: '10px'
},
dataLabel:{
    fontWeight: 'bold',
},
dataValue:{
  paddingLeft:"10px",
  color:"white"
},
iconColor: {
  fontSize: "20px",
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(33, 35, 38, 0.7)',
  border: '2px solid #000',
  borderRadius:"20px",
  boxShadow: 24,
  p: 4,
  //backdropFilter: 'blur(0px)',
  height:"80vh",
  overflow:"auto",
  '::-webkit-scrollbar':{
    width: '1px'
 
  }
}

export default function Profile() {
  const theme = useTheme();
  const classes = useCustomStyles(styles, theme);
  const auth=useSelector(state=>state.auth)
  const [data, setData] = React.useState({});
  const dispatch=useDispatch()

  useEffect(()=>{
       if(auth.info&&!data._id){
         setData({...auth.info,password:"",confirmPassword:""})
       }
  },[auth])
  
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


  const [openUpdateModal,setUpdateModal]=useState(false)  

  const update=()=>{
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
    if (!data.password&&data.confirmPassword)
      return setUnFieldComponents((e) => ({ ...e, password: true }));
    if (data.password&&(!data.confirmPassword || !isPasswordConfirmed()))
      return setUnFieldComponents((e) => ({ ...e, confirmPassword: true }));
    
      dispatch(updateUser(data))
      setTimeout(()=>{
        dispatch(clearUpdateStatus())
        dispatch(fetchUser())
      },3000)
      
      setUpdateModal(false)
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

  const handleclose=()=>{
    setData({...auth.info,password:"",confirmPassword:""})
    setUpdateModal(false)
  }

  const logOut=()=>{
    dispatch(signOut())
    dispatch(fetchUser())
  }

  return (
    <div className={classes?.container}>
      <CommonSection />
      <Header />
      <div className={classes?.homePage}>
          <div className={classes?.box}>
                <div> <img
                  src={
                    auth?.info?.proflePic ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Tc9Tk2q1eJUUlX1bXhWrc0-g8O9xnAplw&s"
                  }
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                /></div>
                <div style={{ display: "flex",justifyContent: "center",alignItems: "center",gap:"5px"}}>
                    {data.isBuyer && (
                        <div>
                          <ShoppingBagIcon style={{ fontSize: "20px" }} />
                        </div>
                      )}
                   <p style={{fontSize:"12px"}}>joined since {moment(data?.createdAt).format('ll')}</p>

                    <div>
                      <Tooltip title='Edit'>
                          <IconButton onClick={()=>setUpdateModal(true)}>
                              <EditIcon className={classes?.iconColor}/>
                          </IconButton>

                      </Tooltip>
                    </div>
                </div>

                <div className={classes?.dataContainer} style={{lineBreak:"anywhere"}}>
                    <div className={classes?.dataItem}>
                        <span className={classes?.dataLabel}>First Name:</span>
                        <span className={classes?.dataValue}>{data?.firstName}</span>
                    </div>
                    <div className={classes?.dataItem}>
                        <span className={classes?.dataLabel}>Last Name:</span>
                        <span className={classes?.dataValue}>{data?.lastName}</span>
                    </div>
                    <div className={classes?.dataItem}>
                        <span className={classes?.dataLabel}>Username:</span>
                        <span className={classes?.dataValue}>{data?.userName}</span>
                    </div>
                    <div className={classes?.dataItem}>
                        <span className={classes?.dataLabel}>Email:</span>
                        <span className={classes?.dataValue}>{data?.email}</span>
                    </div>
                    <div className={classes?.dataItem}>
                        <span className={classes?.dataLabel}>Address:</span>
                        <span className={classes?.dataValue}>{data?.address}</span>
                    </div>
                </div>

                {auth.updateInfo&&<Alert variant="filled" severity="success">{auth.updateInfo?.msg}</Alert>}
                {auth.updateError&&<Alert variant="filled" severity="error">{auth.updateError?.error}</Alert>}
                
                <div><Button onClick={logOut} style={{background:"black",color:"white",fontWeight:"600",marginTop:"30px",textTransform:"inherit"}}>Log out</Button></div>
          </div>
      </div>

      <Modal
          open={openUpdateModal}
          onClose={handleclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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

            <div>
              {auth.updating ? (
                <CircularProgress size={25} />
              ) : (
                <Button className={classes?.button} onClick={update}>
                  Submit
                </Button>
              )}
            </div>
            
          </div>
          
          </Box>
        </Modal>

    </div>
  )
}
