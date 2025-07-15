
require('dotenv').config()
const express=require('express')
const dbCon=require('./app/config/dbCon')
const cors=require('cors')
const path=require('path')
const ejs=require('ejs')
const app=express()
dbCon()
app.set('view engine','ejs');
app.set('views','views')

app.use(cors())
//setup json
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/uploads/users', express.static(path.join(__dirname, 'uploads/users')))
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