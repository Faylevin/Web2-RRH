const http = require('http');

const port = 8080;

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Servidor 1');

});


server.listen(port,()=>{
    console.log(`Servidor: http://127.0.0.1:${port}`);
});