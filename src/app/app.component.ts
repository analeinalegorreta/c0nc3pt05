import { Component, Input } from '@angular/core';
import { Concepto } from './class/conceptos.class';
import { Config } from 'datatables.net';
import { CargosNoFacturable } from './class/cargosNoFacturables.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public conceptos: Concepto[] = []
  public cargo: CargosNoFacturable[] = []
  

  loadConceptos = true

  datosConceptos(concepto: Concepto) {
    this.loadConceptos = false;
    setTimeout(() => {
      this.conceptos.push(concepto)
      this.loadConceptos = true;
    }, 200);

  } 

  datosCargosNofacturables(cargos: CargosNoFacturable[]) {

      this.cargo=cargos
  
  } 

  deleteElement(index: number) {

    this.conceptos.splice(index, 1)

  }

  dtOptions: Config = {
    searching: false,

  };

  subTotal() {
    let SubTotal = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      SubTotal += this.conceptos[a].importe
    }
    return SubTotal
  }

  descuento() {
    let descuento: number = 0
    for (let a = 0; a < this.conceptos.length; a++) {
      descuento += this.conceptos[a].descuento
    }
    return descuento
  }

  total() {
    let total: number = 0
    total = this.subTotal() - this.descuento()
    return total
  }

  granTotal() {
    let granTotal = 0
    for (let a = 0; a < this.cargo.length; a++) {
      
      granTotal += Number(this.cargo[a].importe)
    }
    return granTotal + this.total()
  }


}
