const {server , app, express} = require('./webSocket');
const cors = require('cors');
const PORT = 4000;

app.use(cors())

app.use(express.json());

// Router API
const router_post = require('./Router/post');
const router_get = require('./Router/get');
const router_delete = require('./Router/delete');
const router_put = require('./Router/put');



app.use('/', router_post);
app.use('/', router_get);
app.use('/', router_delete);
app.use('/', router_put);


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
