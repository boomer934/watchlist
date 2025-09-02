const {executeQuery} = require('../db')
const express = require('express')
const verifyToken = require('../middlewares/middleware')
const router = express.Router()

router.delete("/watchlist/:id",verifyToken,async(req,res)=>{
    const {id} = req.params
    const {user_id} = req.user
    const response = await executeQuery("DELETE FROM Watchlist WHERE user_id = ? AND db_id = ?",[user_id,id])
    if(response)return res.status(200).json(response)
    else return res.status(400).json({"message":"film non trovato nella watchlist","response":response})
})

module.exports = router