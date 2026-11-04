const http = require('http')
const PORT = Number(process.argv[2] ?? 8080)
if (!Number.isInteger(PORT) || PORT < 0 || PORT > 65535) {
    console.error('Port must be an integer from 0 to 65535')
    process.exit(1)
}

const httpserver = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello from HTTP server\n')
})
httpserver.listen(PORT, () => console.log(`Server listening on ${httpserver.address().port}`))
httpserver.on('connection', () => console.log('Client is connected'))
