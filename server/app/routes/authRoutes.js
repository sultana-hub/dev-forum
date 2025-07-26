const express=require('express')
const { AuthCheck } = require('../middleware/auth');
const UsersController = require('../controller/UsersController')
const UserImageUpload = require('../helper/usersImageUpload')
const router=express.Router()

//@routes  POST  /api/auth/register 
//Description     user register
//@access    public
router.post('/register', UserImageUpload.single('avatar'), UsersController.register)
//@routes  POST  /api/auth/login
//Description     user login
//@access    public
router.post('/login',UsersController.login)


//@routes    /api/auth
router.get('/',AuthCheck,UsersController.getUserDetails)

module.exports=router