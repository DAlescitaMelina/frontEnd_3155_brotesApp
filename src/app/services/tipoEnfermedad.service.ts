import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoEnfermedad } from '../models/tipoEnfermedad';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedadService {
  private url=`${base_url}/tiposE`
  constructor(private http:HttpClient) { }
  private listaCambio=new Subject<TipoEnfermedad[]>

  list(){
     return this.http.get<TipoEnfermedad[]>(this.url)
  }

  insert(a:TipoEnfermedad){
    return this.http.post(this.url,a)
  }

  setList(listaNueva:TipoEnfermedad[]){
   this.listaCambio.next(listaNueva)
  }

  getList(){
  return this.listaCambio.asObservable()
  }
  listId(id:number){
    return this.http.get<TipoEnfermedad>(`${this.url}/${id}`)
  }

  update(ar:TipoEnfermedad){
    return this.http.put(this.url,ar)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
