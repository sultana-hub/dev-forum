const express=require('express')
const { AuthCheck } = require('../middleware/auth');
const UserController=require('../controller/UsersController')
const router=express.Router()

//@routes    /api/auth

router.get('/',AuthCheck,UserController.userProfile)
router.post('/login',UserController.login)
module.exports=router