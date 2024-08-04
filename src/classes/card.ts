import { ActionType, ColorType } from '@/enums'

export class Card {
    public color: ColorType
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