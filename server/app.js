
require('dotenv').config()
const express=require('express')
const dbCon=require('./app/config/dbCon')
const app=express()
dbCon()


//routes
const userRoutes=require('./app/routes/usersRoutes')
app.use('/api/users',userRoutes)

const postRoutes=require('./app/routes/postsRoutes')
app.use('/api/posts',postRoutes)
const profileRoutes=require('./app/routes/profileRoutes')
app.use('/api/profile',profileRoutes)
const authRoutes=require('./app/routes/authRoutes')
app.use('/api/auth',authRoutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`🚀🚀🚀 server is running at : ${PORT}`)
})