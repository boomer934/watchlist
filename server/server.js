const {server , app, express} = require('./webSocket');
const cors = require('cors');
const helmet = require('helmet')
const PORT = process.env.PORT || 5000;

app.use(cors())
const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],          // tutto di default dal tuo dominio
      imgSrc: ["'self'", "https://watchlist-production-ead0.up.railway.app"], // immagini dal tuo dominio
      scriptSrc: ["'self'"],           // script dal tuo dominio
      styleSrc: ["'self'"]             // CSS dal tuo dominio
    }
  })
);


// Router API
const router_post = require('./Router/post');
const router_get = require('./Router/get');
const router_delete = require('./Router/delete');
const router_put = require('./Router/put');

app.use(express.json());

app.use('/', router_post);
app.use('/', router_get);
app.use('/', router_delete);
app.use('/', router_put);


server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
