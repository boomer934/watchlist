const express = require('express');
const {executeQuery} = require('../db')
const router = express.Router()
const verifyToken = require('../middlewares/middleware')

router.put("/watchlist/:id",verifyToken,async(req,res)=>{
    const {id} = req.params
    const {user_id} = req.user
    const {status} = req.body
    const response = await executeQuery("UPDATE Watchlist SET status = ? WHERE user_id = ? AND db_id = ?",[status,user_id,id])
    if(response)return res.status(200).json(response)
    else return res.status(400).json({"message":"film non trovato nella watchlist","response":response})
})

module.exports = router