export class RNG {
    private _seed: number

    constructor(seed: number) {
        this._seed = seed
    }

    public next() {
        const a = 1664525
        const c = 1013904223
        const m = Math.pow(2, 32)

        this._seed = (a * this._seed + c) % m

        return this._seed / m;
    }

    public static createCode(length: number) {
        const min = Math.pow(36, length - 1)
        const max = Math.pow(36, length) - 1
        const seed = Math.floor(Math.random() * (max - min + 1)) + min
        return seed.toString(36).toUpperCase()
    }
}