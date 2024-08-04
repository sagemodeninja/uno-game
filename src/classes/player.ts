import { Card } from './card'

export class Player {
    
    constructor(id: string, username: string) {
        this.id = id
        this.username = username
    }

    public id: string
    public username: string
    public score: number
    public deck: Card[] = []
}