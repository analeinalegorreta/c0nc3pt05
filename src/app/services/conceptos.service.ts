import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../class/cities.interfaces';
import { Concepto } from '../class/conceptos.class';
import { CargosNoFacturable } from '../class/cargosNoFacturables.class';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {



  constructor( private http: HttpClient) { 

      }


    
      getProd(): Observable<Product[]> {
        return this.http.get<Product[]>(`https://com-next-tech-mapeador-catalogos-qa-sw2nnhxr3q-uc.a.run.app/Catalogos/clave_producto_servicio_by_desc/animal`)
          
      }
    
    
      getProdBusqueda(busqueda:string): Observable<Product[]> {
        return this.http.get<Product[]>(`https://com-next-tech-mapeador-catalogos-qa-sw2nnhxr3q-uc.a.run.app/Catalogos/clave_producto_servicio_by_desc/animal/${busqueda}`)
          
      }


    
    
    
    
    
    
    }
    