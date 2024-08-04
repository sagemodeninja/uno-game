export class GameID {
    private readonly _value: number

    constructor(value: number) {
        this._value = value
    }

    public get value() {
        return this._value
    }

    public toCode() {
        return this._value.toString(36).toUpperCase() 
    }

    public static create(length: number) {
        const min = Math.pow(36, length - 1)
        const max = Math.pow(36, length) - 1
    
        const id = Math.floor(Math.random() * (max - min + 1)) + min
        return new GameID(id)
    }

    public static parse(code: string) {
        const id = parseInt(code, 36)
        return new GameID(id)
    }
}