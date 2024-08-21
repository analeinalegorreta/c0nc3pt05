import { Component } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.scss'
})
export class ImpuestosComponent {

  impuestoTrasladosFederalesTabla = true
  impuestoTrasladosLocalesTabla = true
  impuestoRetenidosFederalesTabla = true
  impuestoRetenidosLocalesTabla = true

  dtOptions: Config = {
    searching: false,

  };



}
