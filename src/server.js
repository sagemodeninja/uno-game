const path = require('path') 
const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static('./'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', socket => {
    console.log(`A user has connected!`)

    socket.on('disconnect', () => {
        console.log('A user disconnected!')
    })
})

const port = 3000
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})