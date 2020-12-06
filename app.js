const express = require('express');
const app = express();
const cors = require('cors');

 /* const productRoutes = require('./api/routes/products'); */
const indicadoresRoutes = require('./api/routes/indicadores');
 
 /* app.use(cors);  */
/* app.use('/',(req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /root'
  });
}); */
 /* app.use('/products', productRoutes); */
app.use('/indicadores', indicadoresRoutes);
 
module.exports = app;