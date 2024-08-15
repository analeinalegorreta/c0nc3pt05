import { Component, EventEmitter, Output } from '@angular/core';
import { Config } from 'datatables.net';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CargosNoFacturable } from '../../class/cargosNoFacturables.class';


@Component({
  selector: 'app-cargos-no-facturables',
  templateUrl: './cargos-no-facturables.component.html',
  styleUrl: './cargos-no-facturables.component.scss'
})
export class CargosNoFacturablesComponent {

  load = true
  public cargosNoFacturables: CargosNoFacturable[] = []
  public myFormCargos: FormGroup = this.fb.group({
    cargo: new FormControl('', [Validators.required]),
    importe: new FormControl<number | null>(null, [Validators.required])
  })
  @Output() myEvent = new EventEmitter<CargosNoFacturable[]>()

  public importeValidacion =
    [
      {
        mask: '', // To hide % when entered digits are removed
      },
      {
        mask: '$num',
        lazy: false, // Make placeholder always visible
        blocks: {
          num: {
            mask: Number,
            thousandsSeparator: ',',
            scale: 6, // digits after decimal
            signed: true, // allow negative
            normalizeZeros: false, // appends or removes zeros at ends
            radix: '.', // fractional delimiter
            padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
          },
        },
      },
    ];


  constructor(private fb:FormBuilder){}

  

  datoscargosNoFacturable(cargosNoFacturable: CargosNoFacturable) {
    // console.log(concepto);
    this.load = false;
    setTimeout(() => {
      this.cargosNoFacturables.push(cargosNoFacturable)
      this.load = true;
    }, 200);

  }


  deleteElement(index:number){
    this.load = false;
    setTimeout(() => {
      this.cargosNoFacturables.splice(index, 1)
      this.load = true;
    }, 200);
    
      }
    
      dtOptions: Config = {
        searching: false,
    
      };



      onSubmit(){

        this.myFormCargos.markAllAsTouched();
        if (this.myFormCargos.invalid) return;  
        this.datoscargosNoFacturable(this.myFormCargos.value as CargosNoFacturable)
        this.myFormCargos.reset();
        this.myEvent.emit(this.cargosNoFacturables)
      }



}
