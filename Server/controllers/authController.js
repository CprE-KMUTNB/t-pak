
const { json } = require('express')
const jwt = require('jsonwebtoken')

exports.login=(req,res)=>{
    //ข้อมูล usernaem , password
    const {username,password} = req.body
    if(password === process.env.ADMIN_PASSWORD){
        //login เข้าสู่ระบบ
        const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
            return res.status(400).json(password)
        }
    
}