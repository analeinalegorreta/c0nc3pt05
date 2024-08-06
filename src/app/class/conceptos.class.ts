export class Concepto {
    cantidad: number | null;
    claveUnidad: string | null;
    unidad: string | null;
    noIdentificacion: string | null;
    descripcion: string | null;
    valorUnitario: number | null;
    importe: number | null;
    descuento: number | null;
    claveProdServ: string | null;
    objetoImp: string | null;
    impuestos: Impuestos;
    cuentaPredial: CuentaPredial[];
    informacionAduanera: InformacionAduanera[];
    complementosConcepto: ComplementosConcepto;
    cuentaTerceros: CuentaTerceros;


    constructor() {
        this.cantidad = null,
        this.claveUnidad = null,
        this.unidad = null,
        this.noIdentificacion = null,
        this.descripcion = null;
        this.valorUnitario = null;
        this.importe = null;
        this.descuento = null;
        this.claveProdServ = null;
        this.objetoImp = null;
        this.impuestos = new Impuestos;
        this.cuentaPredial = [];
        this.informacionAduanera = [];
        this.complementosConcepto = new ComplementosConcepto;
        this.cuentaTerceros = new CuentaTerceros;

    }
}

export class ComplementosConcepto {
    iedu: Iedu | null;
    constructor() {
        this.iedu = new Iedu;
    }
}

export class Iedu {
    nombreAlumno: string | null;
    curp: string | null;
    nivelEducativo: string | null;
    autRVOE: string | null;
    rfcPago: string | null;

    constructor() {
        this.nombreAlumno = null;
        this.curp = null;
        this.nivelEducativo = null;
        this.autRVOE = null;
        this.rfcPago = null;
    }
}

export class CuentaPredial {
    numero: string | null;

    constructor() {
        this.numero = null;
    }
}

export class CuentaTerceros {
    rfcACuentaTerceros: string | null;
    nombreACuentaTerceros: string | null;
    regimenFiscalACuentaTerceros: string | null;
    domicilioFiscalACuentaTerceros: string | null;

    constructor() {
        this.rfcACuentaTerceros = null;
        this.nombreACuentaTerceros = null;
        this.regimenFiscalACuentaTerceros = null;
        this.domicilioFiscalACuentaTerceros = null;

    }
}

export class Impuestos {
    traslados: Retencione[];
    retenciones: Retencione[];

    constructor() {
        this.traslados = [];
        this.retenciones = [];
    }

}

export class Retencione {
    base: number;
    impuesto: string;
    tipoFactor: string;
    tasaoCuota: number;
    importe: number;

    constructor() {
        this.base = null;
        this.impuesto = null;
        this.tipoFactor = null;
        this.tasaoCuota = null;
        this.importe = null;
    }

}

export class InformacionAduanera {
    numeroPedimento: string;

    constructor() {
        this.numeroPedimento = null;
    }

}
