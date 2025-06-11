import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoTransmisionService {
  private url=`${base_url}/tiposT`
  private listaCambio=new Subject<TipoTransmisionService[]>

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<TipoTransmisionService[]>(this.url)
  }
   insert(a:TipoTransmisionService){
    return this.http.post(this.url,a)
  }

  setList(listaNueva:TipoTransmisionService[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable()
  }
}
