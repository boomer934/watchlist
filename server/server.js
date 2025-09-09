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
