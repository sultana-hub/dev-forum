const express=require('express')
const router=express.Router()

//@routes    /api/users 

router.get('/',(req,res)=>res.send("users route"))

module.exports=router