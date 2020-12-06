const http = require('http');
const app = require('./app.js');
/*a primeira parte é definida no servidor, se não tiver, ele usa  3000*/
const port = process.env.PORT || 3000; 
const server = http.createServer(app);

server.listen(port);
console.log("Server is up!");