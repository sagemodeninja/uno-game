import './components/card'
import { Game, GameID } from './classes'

document.addEventListener('DOMContentLoaded', () => {
    const gameCodeInput = document.getElementById('game_code_ipt') as HTMLInputElement
    const createBtn = document.getElementById('create_btn')
    const joinBtn = document.getElementById('join_btn')

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