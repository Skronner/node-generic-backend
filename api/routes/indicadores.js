const express = require('express');
const cors = require('cors');  
const router = express.Router();
const pool = require('../../db');

/*  const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}  */
 

/* console.log('indicadores.js was required'); */

router.get('/teste', cors(), (req, res, next) => {
  console.log('Request on /teste');
  pool.getConnection(function (err, connection) {
    if (err) { throw err }
    else {
      connection.query('SELECT * FROM tb_agilidade_no_desembolso_base_temp',
        function (err, results) {
          if (err) throw err
          res.status(200).json({
            message: 'Lista de Indicadores respondendo de acesso a /teste',
            resultado: results
          });
          connection.release();
        });
    }
  })
});


router.get('/listaCodigosIndicadores', (req, res, next) => {
  console.log('Request on /listaCodigosIndicadores');
  pool.getConnection(function (err, connection) {
    if (err) { throw err }
    else {
      connection.query(
        'SELECT DISTINCT codigo, nome '
        + 'FROM ('
        + 'SELECT DISTINCT codigo '
        + 'FROM tb_indicadores_conecta_cenop '
        + 'UNION '
        + 'SELECT DISTINCT codigo '
        + 'FROM tb_indicadores_conexao_uop'
        + ') tb_union '
        + 'LEFT JOIN tb_indicadores_nome tin ON tin.cod = tb_union.codigo	'
        + 'ORDER BY codigo',
        function (err, results) {
          if (err) throw err
          res.status(200).json({
            message: 'Lista de Indicadores respondendo de acesso a /listaCodigosIndicadores',
            resultado: results
          });
          connection.release();
        });
    }
  })
});

router.get('/:indicador', (req, res, next) => {
  console.log('Request on /:indicador');
  pool.getConnection(function (err, connection) {
    const codigoIndicador = req.params['indicador']
    if (err) { throw err }
    else {
      // console.log("Successful");
      connection.query('SELECT * FROM tb_indicadores_conexao_uop WHERE codigo=' + codigoIndicador, function (err, results) {
        if (err) throw err
        res.status(200).json({
          message: 'Handling GET requests to /products',
          resultado: results
        });
        connection.release();
        console.log("Connection released from pool.");
      });
    }
  });
});

router.get('/', (req, res, next) => {
  pool.getConnection(function (err, connection) {
    if (err) { throw err }
    else {
      console.log("Successful");
      /* connection.query('SELECT * FROM tb_indicadores_conexao_uop', function (err, results) { */
        connection.query('SELECT * FROM tb_agilidade_no_desembolso_base_temp', function (err, results) {        
        if (err) throw err
        res.status(200).json({
          message: 'Handling GET requests to /products',
          resultado: results[0]
        });
        connection.release();
        console.log("Connection released from pool.");
      });
    }
  });
});

module.exports = router;	
