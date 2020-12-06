const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 30,
/*     host: 'localhost',
    user: 'user_central_indicadores',
    password: 'bd_central_indicadores_psw007',
    database: 'indicadores',
    debug: false */
    host: '127.0.0.1',
    user: 'user_teste',
    password: 'teste',
    database: 'indicadores',
    debug: false
  });
  /* console.log('db.js was required.'); */
module.exports =  pool;
