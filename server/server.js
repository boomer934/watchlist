const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

// Router API
const router_post = require('./Router/post');
const router_get = require('./Router/get');
const router_delete = require('./Router/delete');
const router_put = require('./Router/put');

const app = express();
const port = 5000;

const server  = http.createServer(app);
const io = new Server(server,{cors:{origin:"http://localhost:5173"}})
io.on("connection", socket =>{
    console.log("Connected")
})


app.use(express.json());

app.use('/', router_post);
app.use('/', router_get);
app.use('/', router_delete);
app.use('/', router_put);


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
