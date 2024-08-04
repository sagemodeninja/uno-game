import { RNG, Player } from '@/classes'

export class Session {
    private _code: string
    private _players: Player[]

    constructor() {
        this._code = RNG.createCode(6)
        this._players = []
    }

    public get code() {
        return this._code
    }

    public addPlayer(player: Player) {
        this._players.push(player)
    }
}