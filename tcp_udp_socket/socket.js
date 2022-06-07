const net = require('net')
const dgram = require('dgram')
const udp_socket = dgram.createSocket('udp4')

const server = net.createServer( socket => {
    socket.write("This is a TCP Socket")
    socket.on("data", data =>{
        console.log(data.toString())
    })
})

udp_socket.on('message', (msg,rinfo) =>{
    console.log(`Received message ${msg} from ${rinfo.address}:${rinfo.port}`)
})

udp_socket.bind(8081)