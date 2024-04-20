let express=require("express")
let router=express.Router()
let {protect}=require("../services/authMiddleWare")
const users = require('../controllers/userController')

router.post('/register', users.register)
router.post("/login",users.LogIn)
router.put("/profile" ,users.profile)
router.get("/getUser", protect ,users.getUser)
router.get("/fetch/dummy/user-v2", protect ,users.fetchAllUsers)

module.exports=router