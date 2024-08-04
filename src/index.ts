import './components/card'
import { Game, GameID } from './classes'
import io from 'socket.io-client'
import { Socket } from 'socket.io'

class Client {
    private _socket: any

    constructor() {
        this.addEventlisteners()
    }

    public start() {
        this._socket = io()
        this._socket.on('connect', socket => {})
    }

    private addEventlisteners() {
    }
}

class Screen {
    private _dom: HTMLDivElement

    constructor(selector: string) {
        this._dom = document.getElementById(selector) as HTMLDivElement
    }

    public show() {
        this._dom.classList.toggle('shown', true)
    }

    public hide() {
        this._dom.classList.toggle('shown', false)
    }
}

class PlayerScreen extends Screen {
    constructor() {
        super('player_screen')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const playerScreen = document.getElementById('player_screen')
    const usernameIpt = document.getElementById('username_ipt') as HTMLInputElement
    const enterBtn = document.getElementById('enter_btn')


        const socket = io()

    enterBtn.onclick = () => {
        const username = usernameIpt.value
    }

    // Menu
    const menu = document.getElementById('menu_screen')
    const gameCodeInput = document.getElementById('game_code_ipt') as HTMLInputElement
    const createBtn = document.getElementById('create_btn')
    const joinBtn = document.getElementById('join_btn')

    socket.on('connect', () => {
        playerScreen.style.display = 'flex'

        const clientId = socket.id
        console.log(clientId)

        createBtn.onclick = () => {
            const id = GameID.create(6)
            gameCodeInput.value = id.toCode()

            const game = new Game(id)
            console.log(game)
        }

        joinBtn.onclick = () => {
            const code = gameCodeInput.value
            const id = GameID.parse(code)

            const game = new Game(id)
            console.log(game)
        }
    })
})