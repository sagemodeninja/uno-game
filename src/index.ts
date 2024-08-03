import './components/card'
import { UnoCard } from './components/card'

const CARD_COUNT = 108

enum ColorTypes {
    Red,
    Yellow,
    Green,
    Blue
}

enum ActionType {
    Skip,
    Reverse,
    DrawTwo
}

class Card {
    public color: ColorTypes
    public isAction: boolean
    public isWild: boolean
    public isWildDrawFour: boolean
    public number: number
    public actionType: ActionType

    constructor(index: number) {
        const offset = index % 25

        this.color = Math.floor(index / 25)
        this.isWild = index >= 100
        this.isWildDrawFour = this.isWild && (index - 100) >= 4
        this.isAction = offset >= 19

        if (!this.isAction)
            this.number = Card.getNumber(offset)
        else
            this.actionType = Math.trunc((offset - 19) / 2)
    }

    private static getNumber(index: number) {
        return index === 0 ? 0 : Math.trunc((index - 1) / 2) + 1
    }
}

const cards = Array.from({length: CARD_COUNT}, (_, i) => new Card(i))
shuffleArray(cards)
const els = cards.map(card => {
    const el = document.createElement('uno-card') as UnoCard
    el.color = card.color
    el.number = card.number
    return el
})
const debug = document.getElementById('debug')
debug.replaceChildren(...els)

function shuffleArray(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}