import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { Formulario1Component } from './components/formulario1/formulario1.component';
import { IMaskModule } from 'angular-imask';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { CargosNoFacturablesComponent } from './components/cargos-no-facturables/cargos-no-facturables.component';


@NgModule({
  declarations: [
    AppComponent,
    Formulario1Component,
    ModalComponent,
    CargosNoFacturablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IMaskModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
