//ติดต่อกับฐานข้อมูล //ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const {v4:uuidv4} = require('uuid');

//บันทึกข้อมูล
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title)
    if(!slug)slug = uuidv4();
    
    

    //validate / ตรวจสอบความถูกต้องของช้อมูล
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"}) 
            break;
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
        }
        res.json(blog)
    })
}
//ดึงข้อมูลบทความออกมาทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}
//ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}
//ลบข้อมูลจากserver
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            massage:"ลบบทความเรียบร้อย"
        })
    })
}
//update ข้อมูลจาก server
exports.update=(req,res)=>{
    const {slug} = req.params
    //ส่งข้อมูล ได้แต่ title , content . author
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) alert(err)
        res.json(blog)
    })

}

