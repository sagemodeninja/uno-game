import { customComponent, CustomComponent, property, query } from '@sagemodeninja/custom-component'

@customComponent('uno-card')
export class UnoCard extends CustomComponent {
    static styles = `
        :host {
            aspect-ratio: 1.55;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            height: 110px;
            width: 75px;
        }

        :host,
        .content {
            display: grid;
        }
        
        :host *,
        .content * {
            grid-area: 1/1;
        }

        .content {
            background-color: var(--color);
            border-radius: 5px;
            margin: 5px;
            overflow: hidden;
        }
        
        :host([wild]) .content {
            background-color: black;
        }

        .content::before {
            background-color: white;
            border-radius: 50%;
            content: '';
            display: block;
            grid-area: 1/1;
            margin: 5px;
            transform: rotateZ(40deg);
        }

        .label {
            color: white;
            font-size: 1.125rem;
            margin: 4px;
        }

        .label1 {
            place-self: start start;
        }

        .label2 {
            color: var(--color);
            font-size: 2rem;
            place-self: center center;
            z-index: 1;
        }

        .label3 {
            place-self: end end;
        }
    `

    @query('.label1')
    private _label1: HTMLSpanElement

    @query('.label2')
    private _label2: HTMLSpanElement

    @query('.label3')
    private _label3: HTMLSpanElement

    @property()
    public color: number

    @property()
    public number: number

    @property()
    public wild: boolean

    public render() {
        return `
            <div class="content">
                <span class="label label1"></span>
                <span class="label2"></span>
                <span class="label label3"></span>
            </div>
        `
    }

    protected override stateHasChanged(changes: Map<string, any>): void {
        if (changes.has('color')) {
            const colors = ['#c40c00', '#e7d004', '#328a10', '#1254ab']
            this.style.setProperty('--color', colors[this.color])
        }

        if (changes.has('number')) {
            this._label1.innerText = this.number.toString()
            this._label2.innerText = this.number.toString()
            this._label3.innerText = this.number.toString()
        }
    }
}