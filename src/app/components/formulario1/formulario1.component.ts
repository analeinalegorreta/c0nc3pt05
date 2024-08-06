import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConceptosService } from '../../services/conceptos.service';
import { IDropdownSettings, MultiSelectComponent } from 'ng-multiselect-dropdown';
import { Concepto } from '../../class/conceptos.class';
import { Config } from 'datatables.net';

interface optionMultiSelect {
  value: number,
  label: string
}

@Component({
  selector: 'app-formulario1',
  templateUrl: './formulario1.component.html',
  styleUrl: './formulario1.component.scss'
})
export class Formulario1Component {

  constructor(private ConceptosService: ConceptosService) { }


  public mostrarApartadoImpuestos: boolean = false;
  public mostrarApartadoIEDU: boolean = false;

  public dropdownConsulta: any = [];
  public selectedItemsConsulta: any = [];
  public dropdownSettingsConsulta: IDropdownSettings = {};

  public dropdownObjetoImpuesto: optionMultiSelect[] = [];

  public dropdownIEDU: optionMultiSelect[] = [];
  public selectedItemsIEDU: any = [];
  public dropdownSettingsIEDU: IDropdownSettings = {};


  public dropdownNivelEducativo: optionMultiSelect[] = [];
  public selectedItemsNivelEducativo: any = [];
  public dropdownSettingsNivelEducativo: IDropdownSettings = {};

  public load = true



  @Output() myEvent = new EventEmitter<Concepto>()

  dtOptions: Config = {
    searching: false,

  };


  public myForm: FormGroup = new FormGroup({   // datos que se reciben del formulario y validaciones

    cantidad: new FormControl('', [Validators.required]),
    claveUnidad: new FormControl('', [Validators.required]),
    unidad: new FormControl(),
    noIdentificacion: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    valorUnitario: new FormControl('', [Validators.required]),
    importe: new FormControl(),
    descuento: new FormControl(),
    claveProdServ: new FormControl('', [Validators.required]),
    objetoImp: new FormControl('', [Validators.required]),
    impuestos: new FormGroup({
      traslados: new FormArray([]),
      retenciones: new FormArray([])
    }),
    cuentaPredial: new FormControl('', [Validators.required]),
    informacionAduanera: new FormControl(),
    complementos: new FormControl(),
    cuentaTerceros: new FormControl(),

  })

  public mask =
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
            scale: 2, // digits after decimal
            signed: true, // allow negative
            normalizeZeros: false, // appends or removes zeros at ends
            radix: '.', // fractional delimiter
            padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
          },
        },
      },
    ];

  public cantidadConcep =
    [
      {
        mask: '', // To hide % when entered digits are removed
      },
      {
        mask: 'num',
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


  public vUnitario =
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

  public descuento =
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

  public nomAlumno =
    [
      {
        mask: /^[a-zA-Z ]+$/, // To hide % when entered digits are removed
      }
    ];

  public RFC =
    [
      {
        mask: /^[a-zA-Z0-9]+$/, // To hide % when entered digits are removed
      }
    ];




  onItemSelectIEDU(item: any) {
    let seleccionado = item as optionMultiSelect
    if (seleccionado.value == 1) {
      this.mostrarApartadoIEDU = true
    }
  }

  onItemDeSelectIEDU(item: any) {
    let seleccionado = item as optionMultiSelect
    if (seleccionado.value == 1) {
      this.mostrarApartadoIEDU = false
    }
  }

  onSelectAllIEDU(item: any) {
    this.mostrarApartadoIEDU = true
  }

  onDeSelectAllIEDU(item: any) {
    this.mostrarApartadoIEDU = false
  }

  mostrarTablaImpuestos(item:any) {
 
   let seleccionado = (item.target as HTMLInputElement).value;
    if ( '01 No objeto de impuesto' == seleccionado) {
      this.mostrarApartadoImpuestos = false
    }else{
      this.mostrarApartadoImpuestos = true
    }
  }


  onItemSelect(items: any) {
    console.log(items);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onFilterChange(event: any) {
    var sinEspacios = event.replace(/ /g, '')
    var sinSimbolos = sinEspacios.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    if (sinSimbolos.length >= 3) {
      this.ConceptosService.getProdBusqueda(event).subscribe(resp => {
        console.log(resp);
        resp.forEach((elem) => {
          this.dropdownConsulta.push({
            label: elem.cClaveProdServ + ' - ' + elem.descripcion,
            value: elem.id
          })
        })
      })
    }
  }


  guardar() {
    
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid)return;
    let concepto = new Concepto()
    concepto.cantidad = this.myForm.get('cantidad')!.value
    concepto.claveUnidad = this.myForm.get('claveUnidad')!.value
    concepto.unidad = this.myForm.get('unidad')!.value
    concepto.noIdentificacion = this.myForm.get('noIdentificacion')!.value
    concepto.descripcion = this.myForm.get('descripcion')!.value,
      concepto.valorUnitario = this.myForm.get('valorUnitario')!.value
    concepto.descuento = this.myForm.get('descuento')!.value
    concepto.claveProdServ = this.myForm.get('claveProdServ')!.value
    concepto.objetoImp = this.myForm.get('objetoImp')!.value
    let cantidadNumeroca = Number(concepto.cantidad)
    concepto.importe = concepto.valorUnitario * cantidadNumeroca
    this.myEvent.emit(concepto)
  }

 
  guardarImpuestos(formImpuesto: FormGroup) {

    if (formImpuesto.value['impuesto'] === 'Traslados') {
      this.traslados().push(formImpuesto);
    } else {
      this.retenciones().push(formImpuesto);
    }

    this.load = false;
    setTimeout(() => {
      this.load = true;
    }, 200);

  }


  public traslados(): FormArray {
    return this.myForm.get('impuestos.traslados') as FormArray;
  }

  public retenciones(): FormArray {
    return this.myForm.get('impuestos.retenciones') as FormArray;
  }

  ngOnInit() {

    this.ConceptosService.getProd().subscribe(resp => {
      resp.forEach((elem) => {
        this.dropdownConsulta.push({
          label: elem.cClaveProdServ + ' - ' + elem.descripcion,
          value: elem.id
        })
      })

    })

    this.dropdownSettingsConsulta = {
      singleSelection: true,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      limitSelection: 7,
      enableCheckAll: true,
      closeDropDownOnSelection: true
    }

    this.dropdownSettingsIEDU = {
      singleSelection: false,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    }

    this.dropdownSettingsNivelEducativo = {
      singleSelection: true,
      idField: 'value',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      limitSelection: 7,
      enableCheckAll: true,
      closeDropDownOnSelection: true,
      allowSearchFilter: false
    }


    this.dropdownObjetoImpuesto = [
      { value: 1, label: '01 No objeto de impuesto' },
      { value: 2, label: '02 Si objeto de impuesto' },
      { value: 3, label: '03 Sí objeto de impuesto y no obligado al desglose' },
      { value: 4, label: '04 Sí objeto de impuesto y no causa impuesto' },
      { value: 5, label: '05 Sí objeto de impuesto, IVA crédito PODEBI ' }
    ];


    this.dropdownIEDU = [
      { value: 1, label: 'IEDU' },

    ];

    this.dropdownNivelEducativo = [
      { value: 1, label: 'Preescolar' },
      { value: 2, label: 'Primaria' },
      { value: 3, label: 'Secundaria' },
      { value: 4, label: 'Profesional técnico' },
      { value: 5, label: 'Bachillerato o su equivalente' }
    ];

  }

  deleteElementTtaslado(index: number) {

    this.traslados().removeAt(index)
  }


  deleteElementReetenciones(index: number) {

    this.retenciones().removeAt(index)
  }



}


