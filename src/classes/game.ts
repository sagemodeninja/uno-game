import { Card, GameID, Player, RNG } from '@/classes'

export class Game {
    private readonly _rng: RNG
    private readonly _players: Player[]
    private readonly _drawPile: Card[]
    private readonly _discardPile: Card[]

    public get drawPile() {
        return this._drawPile
    }

    constructor(id: GameID) {
        this._rng = new RNG(id.value)
        this._players = []
        this._drawPile = this.createPile()
        this._discardPile = []
    }

    public addPlayer(player: Player) {
        this._players.push(player)
    }

    public start() {
        const playerCount = this._players.length
        const count = playerCount * 7

        for (let i = 0; i < count; i++) {
            const card = this._drawPile.shift()
            this._players[i % playerCount].deck.push(card)
        }

        this._discardPile.push(this._drawPile.shift())
    }

    private createPile() {
        const cards = Array.from({length: 108}, (_, i) => new Card(i))
        this.shuffleCards(cards)
        return cards
    }

    private shuffleCards(cards: Card[]) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(this._rng.next() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
}