
export class TipoDeImpuesto {
    impuesto: number | null;
    tasa: number | null;
    factor: number | null;
    importe: number | null;

    constructor() {
        this.impuesto = null;
        this.tasa = null;
        this.factor = null;
        this.importe = null;
    }
}