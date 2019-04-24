const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

const server = http.createServer((req, res) => {

    let pathObj = url.parse(req.url, true)
    let static = path.resolve(__dirname, './')
    let filepath = decodeURIComponent(path.join(static, pathObj.pathname))
    console.log('request: ' +filepath)
    fs.readFile(filepath, (err, file) => {
        if (err){
            console.log(404)
            res.writeHead(404, 'not found')
            res.end('<h1>404 Not Found</h1>')
            return
        }
        res.write(file)
        res.end()
    })
    
})

server.listen(3001)
console.log('server start: http://localhost:3001')
