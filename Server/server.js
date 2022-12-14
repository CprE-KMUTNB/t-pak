const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./routes/blog')
const kmutnblocationRoute = require('./routes/kmutnblocation')
const userRoute = require('./routes/User')
const kmutnbroommateRoute = require('./routes/kmutnbroommate')
const locationRoute = require('./routes/location')
const roomateRoute = require('./routes/roomate')
const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("Connected"))
.catch((err)=>console.log("Conecting problem"))

//middleware 
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requestes-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','Get, POST , PATCH, DELETE');

    next();
})

//route
app.use('/api',blogRoute)
app.use('/api',kmutnblocationRoute)
app.use('/api',userRoute)
app.use('/api',locationRoute)
app.use('/api',roomateRoute)

const port = process.env.PORT || 8080
//app.listen(port,()=>console.log("Start server in port"))
app.listen(8080);
//app.listen(8080, '192.168.0.73');