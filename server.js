const http = require("http");

const server = http.createServer((req, res) =>{
    res.writeHead(200, {"content-type": "text/plain"});
    res.end("Hello from nodejs Server!");
});


server.listen(3000, () =>{
    console.log("Server running at http://Localhost:3000");
})