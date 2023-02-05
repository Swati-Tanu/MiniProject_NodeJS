//Creating server is also a part of core module i.e., http Module

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const port = "4500";

//To create server:
const server = http.createServer((request,response) => {

    // console.log(request.headers);
    console.log('Request for ' + request.url + ' by method ' + request.method);
    if(request.method == 'GET'){
        var fileURL;

        if(request.url == '/'){
            fileURL = "/index.html";
        }else{
            fileURL = request.url;
        }

        var filePath = path.resolve('./public' + fileURL);
        const fileExt = path.extname(filePath);
        
        if(fileExt == '.html'){
            fs.exists(filePath, (exists) => {

                if(!exists){
                    response.statusCode = 404;
                    response.setHeader('Content-Type','text/html');
                    response.end('<html> <body> <h1> error 404: '+ fileURL + ' does not exists!</h1> </body> </html>')
                }else{
                    response.statusCode = 200;
                    response.setHeader('Content-Type','text/html');
                    fs.createReadStream(filePath).pipe(response);
                }
            })
        } else {
            response.statusCode = 404;
            response.setHeader('Content-Type','text/html');
            response.end('<html> <body> <h1> error 404: '+ fileURL + ' not a html file!</h1> </body> </html>')
        }

    }else{
        response.statusCode = 404;
        response.setHeader('Content-Type','text/html');
        response.end('<html> <body> <h1> error 404: '+ fileURL + ' not supported! </h1> </body> </html>') 
    }
    // response.statusCode = 200;
    // response.setHeader('Content-Type','text/html');

    // response.end('<html> <body> <h1> Server Connection sucess :) </h1> </body> </html>')
})

server.listen(port,hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
});