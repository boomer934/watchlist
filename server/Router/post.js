require('dotenv').config()
const bcrypt = require('bcrypt')
const express = require('express')
const  {executeQuery}  = require('../db')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post("/register" , async(req,res)=>{
    const {name,surname,email,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    try {
        if(await executeQuery("INSERT INTO User(name,surname,email,password) VALUES (?,?,?,?)",[name,surname,email,hashedPassword])){
            return res.json({"message":"utente registrato con successo"})
        }else{
            return res.json({"message":"errore nella registrazione"})
        }
    } catch (error) {
        res.json({"errore" : "utente gia registrato"})
    }
    
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await executeQuery("SELECT * FROM User WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(401).json({
                status: 401,
                message: "Utente inesistente"
            });
        }

        console.log(user)
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                message: "Password errata"
            });
        }

        // Login ok
        const token = jwt.sign({id : user[0].id , name: user[0].name,surname:user[0].surname,email : user[0].email},process.env.JWT_SECRET)
        return res.status(200).json({
            status: 200,
            message: "Login effettuato con successo",
            email: user[0].email,
            token:token
        });

    } catch (error) {
        console.error("Errore nel login:", error);
        return res.status(500).json({
            status: 500,
            message: "Errore interno del server"
        });
    }
});

module.exports = router
