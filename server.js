const http = require('http')   //require in http module
const app =require('./app')   // require in app file

const port = process.env.PORT || 4400;   // port num is 4400

const Server = http.createServer(app);

Server.listen(port);   // listen the port number

console.log("server is running on port"+port)