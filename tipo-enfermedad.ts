import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedadService {
  private url=`${base_url}/tiposE`
    private listaCambio=new Subject<TipoEnfermedadService[]>
  
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<TipoEnfermedadService[]>(this.url)
  }

  setList(listaNueva:TipoEnfermedadService[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
}
