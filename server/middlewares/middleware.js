const jwt = require('jsonwebtoken')
const blacklist = require('../blacklist')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

function verifyToken(req,res,next){ 
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(blacklist.includes(token)){
        res.status(404).json({"message":"Token invalido , usato per il logout"})
    }

    if(!token) return res.status(401).send("Token mancante")
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).send("token invalido")
        req.user = user
        next()
    })
}
module.exports = verifyToken