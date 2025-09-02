const express = require('express')
const app = express()
const cors = require('cors')
const router_post = require('./Router/post')
const router_get = require('./Router/get')
const router_delete = require('./Router/delete')
const port = 5000


app.use(express.json())
app.use(cors())

app.use('/',router_post)
app.use('/',router_get)
app.use('/',router_delete)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})