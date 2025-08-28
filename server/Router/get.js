const express = require('express')
const verifyToken = require('../middlewares/middleware')
const router = express.Router()

router.get("/area_personale",verifyToken,(req,res)=>{
    return res.status(200).json({id:req.user.id, name:req.user.name , surname:req.user.surname,email:req.user.email})
})
router.get("/home",verifyToken,(req,res)=>{
    return res.status(200).json({name:req.user.name , surname:req.user.surname,email:req.user.email})
})

module.exports = router