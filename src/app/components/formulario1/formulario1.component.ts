import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConceptosService } from '../../services/conceptos.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Concepto } from '../../class/conceptos.class';
import { Config } from 'datatables.net';
import { TotalesConceptosService } from '../../services/totales-conceptos.service';
import { Impuesto } from '../../class/impuesto.class';
import { DataTableDirective } from 'angular-datatables';

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

  constructor(private ConceptosService: ConceptosService, private totalesConceptosService:TotalesConceptosService) { }

  public mostrarApartadoImpuestos: boolean = false;
  public mostrarApartadoIEDU: boolean = false;

  public dropdownConsultaClaveServicio: any = [];
  public selectedItemsConsulta: any = [];
  public dropdownSettingsConsulta: IDropdownSettings = {};

  public dropdownObjetoImpuesto: optionMultiSelect[] = [];

  public dropdownIEDU: optionMultiSelect[] = [];
  public selectedItemsIEDU: any = [];
  public dropdownSettingsIEDU: IDropdownSettings = {};

  public dropdownNivelEducativo: optionMultiSelect[] = [];

  public loadImpuestos = true
  public showToastDescuentoNoMayor: boolean = false;

  public concepto: Concepto = new Concepto()

  @Output() myEvent = new EventEmitter<Concepto>()


  

  dtOptions: Config = {
    searching: false,

  };


  public myForm: FormGroup 

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

  public unidadConcep =
    [
      {
        mask: '', // To hide % when entered digits are removed
      },
      {
        mask: /^[a-zA-Z0-9]+$/,
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


  public cPredial =
    [
      {
        mask: '', // To hide % when entered digits are removed
      },
      {
        mask: /^[a-zA-Z0-9]+$/,
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


    inicializarForm(){
    this.myForm=  new FormGroup({   // datos que se reciben del formulario y validaciones

        cantidad: new FormControl('', [Validators.required]),
        claveUnidad: new FormControl([], [Validators.required]),
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
        complementosConcepto: new FormGroup({
          iedu: new FormGroup({
            nombreAlumno: new FormControl(),
            curp: new FormControl(),
            nivelEducativo: new FormControl(),
            autRVOE: new FormControl(),
            rfcPago: new FormControl(),
          }),
        }),
        cuentaTerceros: new FormControl(),
    
      })
    }

  validaconesIEDU() {
    (this.myForm.get('complementosConcepto.iedu.nombreAlumno') as FormControl).setValidators([Validators.required]),
      (this.myForm.get('complementosConcepto.iedu.curp') as FormControl).setValidators([Validators.required]),
      (this.myForm.get('complementosConcepto.iedu.nivelEducativo') as FormControl).setValidators([Validators.required]),
      (this.myForm.get('complementosConcepto.iedu.autRVOE') as FormControl).setValidators([Validators.required]),
      (this.myForm.get('complementosConcepto.iedu.rfcPago') as FormControl).setValidators([Validators.required])
  }

  SinvalidaconesIEDU() {

    (this.myForm.get('complementosConcepto.iedu.nombreAlumno') as FormControl).setValidators([]),
      (this.myForm.get('complementosConcepto.iedu.curp') as FormControl).setValidators([]),
      (this.myForm.get('complementosConcepto.iedu.nivelEducativo') as FormControl).setValidators([]),
      (this.myForm.get('complementosConcepto.iedu.autRVOE') as FormControl).setValidators([]),
      (this.myForm.get('complementosConcepto.iedu.rfcPago') as FormControl).setValidators([])
  }



  onItemSelectIEDU(item: any) {
    let seleccionado = item as optionMultiSelect
    if (seleccionado.value == 1) {
      this.mostrarApartadoIEDU = true,
        this.validaconesIEDU()
    }
  }

  onItemDeSelectIEDU(item: any) {

    let seleccionado = item as optionMultiSelect
    if (seleccionado.value == 1) {
      this.mostrarApartadoIEDU = false
      this.SinvalidaconesIEDU()
    }
  }

  onSelectAllIEDU(item: any) {
    this.mostrarApartadoIEDU = true,
      this.validaconesIEDU()
  }

  onDeSelectAllIEDU(item: any) {
    this.mostrarApartadoIEDU = false
    this.SinvalidaconesIEDU()
  }

  mostrarTablaImpuestos(item: any) {

    let seleccionado = (item.target as HTMLInputElement).value;
    if ('01 No objeto de impuesto' == seleccionado) {
      this.mostrarApartadoImpuestos = false
    } else {
      this.mostrarApartadoImpuestos = true
    }
  }

  onItemSelectClaveUni() {
    console.log(this.myForm.get('claveUnidad')!.value[0].value );

    // let claveUni = item as optionMultiSelect
    // console.log(claveUni);

    // this.myForm.controls['claveUnidad'].setValue(claveUni.value);


    // (onSelect)="onItemSelectClaveUni($event)"

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
        resp.forEach((elem) => {
          this.dropdownConsultaClaveServicio.push({
            label: elem.cClaveProdServ + ' - ' + elem.descripcion,
            value: elem.cClaveProdServ
          })
        })
      })
    }
  }


  guardar() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    this.concepto = new Concepto()
    this.concepto.cantidad = this.myForm.get('cantidad')!.value
    this.concepto.claveUnidad = this.myForm.get('claveUnidad')!.value[0].value
    this.concepto.unidad = this.myForm.get('unidad')!.value
    this.concepto.noIdentificacion = this.myForm.get('noIdentificacion')!.value
    this.concepto.descripcion = this.myForm.get('descripcion')!.value,
      this.concepto.valorUnitario = this.myForm.get('valorUnitario')!.value
    this.concepto.descuento = Number(this.myForm.get('descuento')!.value)
    this.concepto.claveProdServ = this.myForm.get('claveProdServ')!.value[0].value
    this.concepto.objetoImp = this.myForm.get('objetoImp')!.value
    let cantidadNumeroca = Number(this.concepto.cantidad)
    this.concepto.importe = this.concepto.valorUnitario * cantidadNumeroca
    this.importeNoMayorAdescuento()
    this.concepto.complementosConcepto.iedu.nombreAlumno = this.myForm.get('complementosConcepto.iedu.nombreAlumno')!.value
    this.concepto.complementosConcepto.iedu.curp = this.myForm.get('complementosConcepto.iedu.curp')!.value
    this.concepto.complementosConcepto.iedu.nivelEducativo = this.myForm.get('complementosConcepto.iedu.nivelEducativo')!.value
    this.concepto.complementosConcepto.iedu.autRVOE = this.myForm.get('complementosConcepto.iedu.autRVOE')!.value
    this.concepto.complementosConcepto.iedu.rfcPago = this.myForm.get('complementosConcepto.iedu.rfcPago')!.value
    this.totalesConceptosService.procesarConcepto(this.concepto, this.myForm)
    this.myEvent.emit(this.concepto)
    console.log(this.concepto);
 
    this.myForm.reset()
  }

  importeNoMayorAdescuento() {
    if (!(this.concepto.descuento < this.concepto.importe)) {
      this.showToastDescuentoNoMayor = true
      throw new Error("Error descuento mayor que el importe"); //excepcion
    }
  }

  guardarImpuestos(formImpuesto: Impuesto) {

    let form = new FormGroup({
      impuesto: new FormControl(formImpuesto.impuesto),
      federalLocal: new FormControl(formImpuesto.federalLocal),
      trasladoRetencion: new FormControl(formImpuesto.trasladoRetencion),
      tipoFactor: new FormControl(formImpuesto.tipoFactor),
      tasaoCuota: new FormControl(formImpuesto.tasaoCuota),
      pAplicacion: new FormControl(formImpuesto.pAplicacion)
    })
    

    if (form.value['trasladoRetencion'] === 'TRASLADO') {
      this.traslados().push(form);      
    } else {
      this.retenciones().push(form);
    }

    this.loadImpuestos = false;
    setTimeout(() => {
      this.loadImpuestos = true;
    }, 200);

  }

  public traslados(): FormArray {
    return this.myForm.get('impuestos.traslados') as FormArray;
  }

  public retenciones(): FormArray {
    return this.myForm.get('impuestos.retenciones') as FormArray;
  }

  ngOnInit() {
    this.inicializarForm()
    this.ConceptosService.getProd().subscribe(resp => {
      resp.forEach((elem) => {
        this.dropdownConsultaClaveServicio.push({
          
          label: elem.cClaveProdServ + ' - ' + elem.descripcion,
          value: elem.cClaveProdServ
        })
        this.inicializarForm()
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


