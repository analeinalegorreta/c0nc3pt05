import { Component, Input, ViewChild } from '@angular/core';
import { Concepto } from './class/conceptos.class';
import { Config } from 'datatables.net';
import { CargosNoFacturable } from './class/cargosNoFacturables.class';
import { TotalesConceptosService } from './services/totales-conceptos.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public conceptos: Concepto[] = []
  public cargo: CargosNoFacturable[] = []
  @ViewChild(DataTableDirective, { static: false })
  public dtElement!: DataTableDirective;
  
  constructor(private totalesConceptosService:TotalesConceptosService) { }

  loadConceptos = true

  datosConceptos(concepto: Concepto) {
    this.loadConceptos = false;
  
    console.log(concepto);
    this.conceptos.push(concepto)
    
      this.dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.draw();
      });
      
      this.loadConceptos = true;
  

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
 
    return this.totalesConceptosService.getTotales().subTotal
  }

  descuento() {

    return  this.totalesConceptosService.getTotales().descuento
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


  totalTrasladosFederales(){
    return this.totalesConceptosService.getTotales().totalTrasladosFederales  
  }

}
