import { TipoDeImpuesto } from "./tipoDeImpuesto.class";

export class Totales {
    subTotal: number | null;
    descuento: number | null;
    total: number | null;
    granTotal: number | null;
    totalTrasladosFederales: number | null;
    totalTrasladosLocales: number | null;
    totalRetenidosFederales: number | null;
    totalRetenidosLocales: number | null;
    tipoDeImpuesto:TipoDeImpuesto[];


    constructor() {
        this.subTotal = null;
        this.descuento = null;
        this.total = null;
        this.granTotal = null;
        this.totalTrasladosFederales = null;
        this.totalTrasladosLocales = null;
        this.totalRetenidosFederales = null;
        this.totalRetenidosLocales = null;
        this.tipoDeImpuesto = null;
    }
}




