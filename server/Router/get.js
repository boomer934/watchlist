const express = require('express')
const verifyToken = require('../middlewares/middleware')
const {executeQuery} = require('../db')
const router = express.Router()

router.get("/area_personale",verifyToken,(req,res)=>{
    return res.status(200).json({id:req.user.id, name:req.user.name , surname:req.user.surname,email:req.user.email})
})
router.get("/home",(req,res)=>{
    return res.status(200).json({name:req.user?.name , surname:req.user?.surname,email:req.user?.email})
})

router.get("/watchlist",verifyToken,async(req,res)=>{
    console.log(req.user)
    const {user_id} = req.user
    const response = await executeQuery("SELECT * FROM Watchlist WHERE user_id = ?",[user_id])
    return res.status(200).json(response)
})

module.exports = router