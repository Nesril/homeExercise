const User=require("../Models/userModel")
const jwt=require("jsonwebtoken")

const bcrypt=require("bcryptjs")
require("dotenv").config()

let generalTokn=(id)=>{
    return jwt.sign({id}, process.env.JWT_TOKEN,{expiresIn:'30d'}
)
}
  
const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

const register=async (req,res)=>{
    const data=req.body
    const {email,firstName,lastName, userName, password, confirmPassword, proflePic, address}=data
    try{
        if(!email || !firstName || !lastName ||
          !userName || !password || !confirmPassword ||!address
        ){

            return  res.status(400).send({error:"Please add all fields"})

        }

        
      
        if(!isValidEmail(email)) return res.status(400).send({error:"invalid email"})
        if(password.trim()!==confirmPassword.trim()) return res.status(400).send({error:"Password not confirmed"})
        
        let userEmailExist=await User.findOne({email:email})
        if(userEmailExist) return  res.status(400).send({error:"This email already taken"})
        
        let userUsernameExist=await User.findOne({userName:userName})
        if(userUsernameExist) return  res.status(400).send({error:"This username already taken"})
        
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashedPassword = bcrypt.hashSync(password, salt);
        data['password']=hashedPassword
      
        try{
            await User.create(data) 
            return res.status(201).send({msg:"Successfuly Registered!!!"})//look at the network  
        } 

        catch(error){
            return res.status(500).send({error:"invalid user data"})
        }

  }
  catch(error){
     return  res.status(400).send({error:"Error occured"})
  }
    
}


const LogIn=async(req,res)=>{
    const {email, password}=req.body
  
    try{
        
        ////check user email
        let findByEmail=await User.findOne({email:email})
    
        if(findByEmail&&(await bcrypt.compare(password,findByEmail.password))){
            const token = generalTokn(findByEmail._id);
            res.cookie("authToken", token, { httpOnly: true });
            return res.status(200).send({ token: token });
        }
        else{
          return res.status(404).json({error:"Invalid credential"})
        }
    }catch(error){ res.status(501).json({errors:error,error:"internal server error"})}
  
  }
  
const getUser = async (req, res) => {

    try{
        if(!req.user) return res.status(404).send({msg:"User not found"})

        let {latitude,longitude} = req.query

        if(latitude&&longitude) await User.updateOne({_id:req.user._id},{$set:{userCurrentLocation:{longitude,latitude}}})
        let user=await User.findOne({_id:req.user._id})

        if(!user)  return res.status(404).send({msg:"User not found"})
        // user = user.toObject();

        // delete user._id
        // delete user.email
        return res.status(201).send(user)//look at the network  

    }catch(error){ 
      console.log(error);
      res.status(501).send({error:"internal server error"})}

}

const profile = async (req, res) => {
  const {id}=req.query
  let data = req.body
  const {password,confirmPassword,email,userName,lastName,firstName,address}=data

   if(!email || !firstName || !lastName ||!userName ||!address){

        return  res.status(400).send({error:"Please add all fields"})

    }

    try{
          let user=await User.findOne({_id:id})
          if(!user)  return res.status(404).send({msg:"User not found"})

          if(!isValidEmail(email)) return res.status(400).send({error:"invalid email"})
          if((password&&!confirmPassword)||(!password&&confirmPassword))  return res.status(400).send({error:"Password not confirmed"})
          
          if(password&&confirmPassword&&(password?.trim()!==confirmPassword?.trim())) return res.status(400).send({error:"Password not confirmed"})
          
          const userEmailExist=await User.findOne({email:email})
          if(userEmailExist&&userEmailExist.id.toString()!==id.toString()) return  res.status(400).send({error:"This email already taken"})
          
          const userUsernameExist=await User.findOne({userName:userName})
          if(userUsernameExist&&userUsernameExist.id.toString()!==id.toString()) return  res.status(400).send({error:"This username already taken"})
          
          if(password){
            const saltRounds = 10;
            let salt = bcrypt.genSaltSync(saltRounds);
            let hashedPassword = bcrypt.hashSync(password, salt);
            data['password']=hashedPassword

          }
          else{
            delete data.password
            delete data.confirmPassword
          }
          delete data._id
          delete data.__v
          delete data.createdAt
          delete data.updatedAt

          await User.updateOne({_id:id},{$set:data})
          return res.status(200).send({msg:"User Successfuly updated"})
          
    }
   catch(error){
    console.log(error);
    return  res.status(400).send({error:"Error occured"})
 }

}

const fetchAllUsers = async (req, res) => {
  try {
    if (!req.user) return res.status(401).send({ msg: "Not Authorized" });

    let { page, limit } = req.query;

    // Set default values for page and limit if not provided
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    console.log(page, limit);
    const totalUsersCount = await User.countDocuments();
    const totalPages = Math.ceil(totalUsersCount / limit);

    // Calculate skip value to determine the starting index of users to fetch
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    return res.status(201).send({ users, totalPages });

  } catch (error) {
    console.log(error);
    res.status(501).send({ error: "Internal server error" });
  }
};


module.exports={
    register,
    LogIn,
    getUser,
    fetchAllUsers,
    profile
}