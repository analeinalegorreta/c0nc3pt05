import { Injectable } from '@angular/core';
import { Concepto } from '../class/conceptos.class';
import { CargosNoFacturable } from '../class/cargosNoFacturables.class';
import { Totales } from '../class/totales.class';
import { FormArray, FormGroup } from '@angular/forms';
import { Impuesto } from '../class/impuesto.class';

@Injectable({
  providedIn: 'root'
})
export class TotalesConceptosService {

  conceptos: Concepto[] = []
  myForm: FormGroup[] = []
  cargosNoFacturables: CargosNoFacturable[] = []
  totales: Totales

  constructor() {
    this.totales = new Totales
  }

  procesarConcepto(concepto: Concepto, myForm: FormGroup) {
    this.conceptos.push(concepto)
    this.myForm.push(myForm)
    this.subTotal()
    this.descuento()
    this.totalTrasladosFederales()
  }

private  subTotal() {
    let SubTotal = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      SubTotal += this.conceptos[a].importe
    }
    this.totales.subTotal = SubTotal
  }

private  descuento() {
    let descuento: number = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      descuento += this.conceptos[a].descuento
    }
    this.totales.descuento = descuento
  }


 private totalTrasladosFederales() {
    let totalTrasladosFederales = 0

    for (let a = 0; a < this.conceptos.length; a++) {
      let impuestos = this.myForm[a].get('impuestos') as FormGroup
      let traslados = impuestos.get('traslados') as FormArray
      for (let b = 0; b < traslados.controls.length; b++) {
        let impuesto= traslados.controls[b] as FormGroup
        let impuestoX=impuesto.value as Impuesto
        if (impuestoX.federalLocal == 'FEDERAL') {
          console.log(this.conceptos[a].importe + '-' + this.conceptos[a].descuento  + '-' +  impuestoX.tasaoCuota);
          let resultado = (this.conceptos[a].importe - this.conceptos[a].descuento) * impuestoX.tasaoCuota
          totalTrasladosFederales += resultado
        }
      }

    }
    console.log('siguiente');
    
    this.totales.totalTrasladosFederales=totalTrasladosFederales

  }

public  getTotales(){
    return this.totales
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




}
