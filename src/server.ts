import * as path from 'path'
import express = require('express')
import * as http from 'http'
import { Server } from 'socket.io'
import { Game, GameID, Session } from '@/classes'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const sessions = new Map<string, Session>()

app.use(express.static('www'))

app.get('/', (_: any, res: any) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/session/create', (_, res) => {
    const session = new Session()
    const code = session.code

    sessions.set(code, session)
    res.send({ code })
})

app.post('/session/join', (req, res) => {
    const code = req.query.code.toString()
    const session = sessions.get(code)

    if (!session) {
        return res.status(404).send({
            message: `Session with code '${code}' not found!`
        })
    }

    res.send()
})

io.on('connection', socket => {
    console.log(`A client has connected!`)

    socket.on('disconnect', () => {
        console.log('Client has disconnected!')
    })
})

const port = 3000
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})