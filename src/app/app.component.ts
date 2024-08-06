import { Component, Input } from '@angular/core';
import { Concepto } from './class/conceptos.class';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public conceptos: Concepto[] = []

  load = true

  datosConceptos(concepto: Concepto) {
    // console.log(concepto);
    this.load = false;
    setTimeout(() => {
      this.conceptos.push(concepto)
      this.load = true;
    }, 200);

  }

  deleteElement(index:number){

this.conceptos.splice(index, 1)

  }

  dtOptions: Config = {
    searching: false,

  };





}
