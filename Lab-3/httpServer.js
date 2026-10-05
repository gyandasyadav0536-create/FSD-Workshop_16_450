import http from "http";
const server = http.createServer((req, res) => {
    
    const url = req.url;
    
    const method = req.method;
    if (url == '/msg' && method == 'GET') {
        res.end("this is welcome message from server");
    }
    else if (url = "/sys" && method == "GET") {
        res.end("This is system information");

    }
});
server.listen(3000, () => {
    console.log("server is running on port number 3000");
});