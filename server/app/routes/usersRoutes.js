const express=require('express')
const UsersController=require('../controller/UsersController')
const UserImageUpload=require('../helper/usersImageUpload')
//const { AuthCheck } = require('../middleware/auth')
const router=express.Router()

//@routes    /api/users 

//post user     /api/users/register 

router.post('/register',UserImageUpload.single('avatar'),UsersController.register)
// router.post('/verify/email',UsersController.verifyEmail)
// router.post('/login',UsersController.login)
// router.post('/reset-password-link',UsersController.resetPasswordLink);
// router.post('/reset-password/:id/:token',UsersController.resetPassword);

module.exports=router