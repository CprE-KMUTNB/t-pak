const express = require("express")
const router = express.Router()
const {remove,getAllkmutnblocation,getUserkmutnblocation,singleKmutnblocaion} = require('../controllers/kmutnblocationController')
const kmutnblocations = require("../models/kmutnblocation")
const multer = require("multer")
const slugify = require("slugify")
const {v4:uuidv4} = require('uuid');
//ประกาศขายหอพัก
//router.post('/kmutnblocation/create',uploadImage,create)
//router.post('/kmutnblocation/upload',uploadImage,upload)
//การเรียกใช้งาน
//router.get('/kmutnblocations',getAllkmutnblocation)
const storage = multer.diskStorage({
    destination: (req,file,callback) =>{
        callback(null,"../client/public/uploads");
    },
    filename: (req,file,callback)=>{
        callback(null,file.originalname);
    }
})
/*const multerConfig = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,'public/');
    },
    filename:(req,file,callback)=>{
        const ext = file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`);
        //callback(null,file.originalname);
    },
});
const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith('image')){
        callback(null,true)
    }else{
        callback(new Error('Only Image is Allowed..'))
    }
}
*/
const uploads = multer({storage:storage});
/*const uploads = multer({
    storage:multerConfig,
    //fileFilter:isImage,
});*/

router.post("/kmutnblocation/create",uploads.single("Image") ,(req,res) => {
    let slug = slugify(req.body.name)
    if(!slug)slug = uuidv4();
    const newkmutnblocations = new kmutnblocations({
        ID:req.body.ID,
        name:req.body.name,
        detail:req.body.detail,
        telephone:req.body.telephone,
        price:req.body.price,
        slug:slug,
        Image:req.file.originalname
    });
    //validate / ตรวจสอบความถูกต้องของช้อมูล
    newkmutnblocations
    
    .save()
    .then(()=> res.json("Create Succuess"))
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
})
router.put("/kmutnblocation/update/:slug",(req,res) => {
    const {slug} = req.params
    kmutnblocations.findOne({slug})
    .then(article => {
        article.id = req.body.userid
        article.name = req.body.name
        article.detail = req.body.detail
        article.price = req.body.price
        //article.Image = req.file.Image

        article
            .save()
            .then(() => res.json("UPDATED!!"))
            .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

//การเรียกใช้งาน
router.get('/kmutnblocations',getAllkmutnblocation)
router.post('/kmutnblocations/user',getUserkmutnblocation)

router.get('/kmutnblocation/update/:slug',singleKmutnblocaion) 

//router.put('/kmutnblocation/update/:slug',update)
router.delete('/kmutnblocation/delete/:slug',remove)

module.exports = router