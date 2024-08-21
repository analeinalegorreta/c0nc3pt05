import { Injectable } from '@angular/core';
import { Concepto } from '../class/conceptos.class';
import { CargosNoFacturable } from '../class/cargosNoFacturables.class';
import { Totales } from '../class/totales.class';

@Injectable({
  providedIn: 'root'
})
export class TotalesConceptosService {

  conceptos: Concepto[] = []
  cargosNoFacturables: CargosNoFacturable[] = []
  totales: Totales

  constructor() {
    this.totales = new Totales
  }


  subTotal() {
    let SubTotal = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      SubTotal += this.conceptos[a].importe
    }
    this.totales.subTotal = SubTotal
  }

  descuento() {
    let descuento: number = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      descuento += this.conceptos[a].descuento
    }
    this.totales.descuento = descuento
  }


  totalTrasladosFederales() {
    let totalTrasladosFederales = 0



    for (let a = 0; a < this.conceptos.length; a++) {

      for (let b = 0; b < this.conceptos[a].impuestos.traslados.length; b++) {
      let tipoTraslado=this.conceptos[a].impuestos.traslados[b]
        // if (tipoTraslado.=="") {

        // }
      }
      totalTrasladosFederales += (this.conceptos[a].importe - this.conceptos[a].descuento) 
    }

  }

  // total() {
  //   let total: number = 0
  //   total = this.subTotal() - this.descuento()
  //   return total
  // }

  // granTotal() {
  //   let granTotal = 0
  //   for (let a = 0; a < this.cargo.length; a++) {

  //     granTotal += Number(this.cargo[a].importe)
  //   }
  //   return granTotal + this.total()
  // }


guardarConcepto(concepto:Concepto){
this.conceptos.push(concepto)

console.log(this.conceptos);


}


}
