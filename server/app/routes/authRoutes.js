const express=require('express')
const router=express.Router()

//@routes    /api/auth

router.get('/',(req,res)=>res.send("Auth routes"))

module.exports=router