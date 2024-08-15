import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface optionMultiSelect {
  value: number,
  label: string,
  selected: boolean
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  private readonly TASA: number = 2;
  public porcentajeAplicacionTasa: boolean = false;
  public tasaOcuotaOculto: boolean = true;

  public tasaOcuota: string;
  public porcentajeTasaoCuota: string

  public tasaCuotaDinamico: number

  public prueba2: number

  public myFormModal: FormGroup

  public dropdownImpuesto: optionMultiSelect[] = [];
  public dropdownLocaloFederal: optionMultiSelect[] = [];
  public dropdownRetenOtras: optionMultiSelect[] = [];
  public dropdowntTipoFactor: optionMultiSelect[] = [];

  public show: boolean = false;


  @Output() myEvent = new EventEmitter<FormGroup>()

  ngOnInit() {

    this.dropdownImpuesto = [
      { value: 1, label: '001 ISR', selected: false },
      { value: 2, label: '002 IVA', selected: false },
      { value: 3, label: '003 IEPS', selected: false },
      { value: 4, label: 'IAFE IAFE', selected: true },
      { value: 5, label: 'IUIH IUIH', selected: false },
      { value: 6, label: 'ISUIH ISUIH', selected: false },
      { value: 7, label: 'ISH ISH', selected: false },
      { value: 8, label: 'DSA DSA', selected: false },
      { value: 9, label: 'IMP-CT IMP-CT', selected: false },
      { value: 10, label: 'SC SC', selected: false },
      { value: 11, label: 'ISN ISN', selected: false },
      { value: 12, label: 'IIS IIS', selected: false },
      { value: 13, label: '5 AL MILLAR 5 AL MILLAR', selected: false },
      { value: 14, label: 'Servicio Servicio', selected: false },
      { value: 15, label: 'ISH MPAL ISH MPAL', selected: false },
      { value: 16, label: 'IAU Impuesto Adicional Universitario', selected: false },
      { value: 17, label: 'IBA IBA', selected: false },
    ];

    this.dropdownLocaloFederal = [
      { value: 1, label: 'Local o Federal', selected: false },
      { value: 2, label: 'LOCAL', selected: false },
      { value: 3, label: 'FEDERAL', selected: false },
    ];

    this.dropdownRetenOtras = [
      { value: 1, label: 'Retención o Traslado', selected: false },
      { value: 2, label: 'TRASLADO', selected: false },
      { value: 3, label: 'RETENCION', selected: false },
    ];

    this.dropdowntTipoFactor = [
      { value: 1, label: 'Tipo Factor', selected: false },
      { value: 2, label: 'TASA', selected: false },
      { value: 3, label: 'CUOTA', selected: false },
      { value: 4, label: 'EXENTO', selected: false },
    ];

  }


  onItemSelectImpuesto(item: any) {

    let seleccionado = (item.target as HTMLInputElement).value;

    if (seleccionado == "002 IVA") {
      this.tasaOcuotaOculto = true,
        (this.myFormModal.get('tasaoCuota') as FormControl).setValue("16"),
        (this.myFormModal.get('tipoFactor') as FormControl).setValue("TASA")
      this.porcentajeAplicacionTasa = true
      this.tasaCuotaDinamico = 16
      this.porsentajeIngresadoBlur()
    } else {
      (this.myFormModal.get('tasaoCuota') as FormControl).setValue(null),
        (this.myFormModal.get('tipoFactor') as FormControl).setValue(null)
      this.porcentajeAplicacionTasa = false
      this.tasaOcuotaOculto = true
    }
  }


  onItemSelectTipoFactor(item: any) {

    let seleccionado = (item.target as HTMLInputElement).value;

    if (seleccionado == "EXENTO") {

      (this.myFormModal.get('tasaoCuota') as FormControl).setValidators([]);
      this.tasaOcuotaOculto = false,
      (this.myFormModal.get('tasaoCuota') as FormControl).setValue("0")
      this.porcentajeAplicacionTasa = false
      this.tasaCuotaDinamico=0
    } else if (seleccionado == "TASA") {
      this.tasaOcuotaOculto = true
      this.porcentajeAplicacionTasa = true,
        (this.myFormModal.get('tasaoCuota') as FormControl).setValue(null),
        (this.myFormModal.get('tasaoCuota') as FormControl).setValidators([Validators.required, Validators.min(1), Validators.max(100)])
    }
    else {
      this.porcentajeAplicacionTasa = false,
        (this.myFormModal.get('pAplicacion') as FormControl).setValue("N/A"),
        (this.myFormModal.get('tasaoCuota') as FormControl).setValue(null),
        (this.myFormModal.get('tasaoCuota') as FormControl).setValidators([Validators.required, Validators.min(1), Validators.max(100)])
        this.tasaOcuotaOculto = true
    }

    console.log(this.myFormModal);
    
  }


  onItemSelect(items: any) {
    console.log(items);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  public tasaCuota =
    [
      {
        mask: /[0-9]/, // To hide % when entered digits are removed
      }
    ];



  guardarImpuestos() {

    this.myFormModal.markAllAsTouched();
    if (this.myFormModal.invalid) return;

    (this.myFormModal.get('tasaoCuota') as FormControl).setValue(String(this.tasaCuotaDinamico)),
      (this.myFormModal.get('pAplicacion') as FormControl).setValue(String(this.porcentajeMostrado()))
    if ((this.myFormModal.get('tipoFactor') as FormControl).value != "TASA") {
      (this.myFormModal.get('pAplicacion') as FormControl).setValue("N/A")
    }
    this.myEvent.emit(this.myFormModal)
    this.inicializarForm()
    this.modalService.dismissAll()
  }

  cerrarModal() {
    this.modalService.dismissAll()

  }


  inicializarForm() {
    this.porcentajeAplicacionTasa = false;
    this.tasaOcuota = undefined
    this.porcentajeTasaoCuota = undefined
    this.tasaCuotaDinamico = undefined
    this.prueba2 = undefined

    this.myFormModal = new FormGroup({
      impuesto: new FormControl('', [Validators.required]),
      federalLocal: new FormControl('', [Validators.required]),
      trasladoRetencion: new FormControl('', [Validators.required]),
      tipoFactor: new FormControl('', [Validators.required]),
      tasaoCuota: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
      pAplicacion: new FormControl(),
    })
  }

  constructor(private modalService: NgbModal) {

    this.inicializarForm()
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    console.log(content);
    this.modalService.open(content, { centered: true, size: 'lg' });

  }

  public prueba(): FormGroup {
    return this.myFormModal.get('tasaoCuota') as FormGroup;
  }

  porcentaje(e: Event) {

    let porcentaje = parseInt((e.target as HTMLInputElement).value)
    let tasaCuota = (this.myFormModal.get('tasaoCuota') as FormControl).value;
    let resultado = tasaCuota * porcentaje / 100

    this.tasaCuotaDinamico = resultado
  }

  porsentajeIngresadoBlur() {

    let tasaCuota = (this.myFormModal.get('tasaoCuota') as FormControl).value;
    this.tasaCuotaDinamico = tasaCuota
    this.prueba2 = tasaCuota
  }

  porcentajeMostrado() {
    let resultado = (this.tasaCuotaDinamico * 100) / this.prueba2
    return Number.isNaN(resultado) ? 100 : resultado
  }

}
