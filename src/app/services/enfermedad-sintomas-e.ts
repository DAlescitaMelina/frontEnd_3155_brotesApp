import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EnfermedadSintomasE } from '../models/enfermedadSintomasE';
import { QM1 } from '../components/reportes/q-m1/q-m1';
import { QM1DTO } from '../models/q_m1dto';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class EnfermedadSintomasEService  {
  private url=`${base_url}/EnfermedadSintomasE`
  private listaCambio = new Subject<EnfermedadSintomasE[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<EnfermedadSintomasE[]>(this.url +"/lista");
  }
  insert(esintomas: EnfermedadSintomasE) {
    return this.http.post(this.url+"/inserta",esintomas)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:EnfermedadSintomasE[]) {
    this.listaCambio.next(listaNueva);
  }
  update(s:EnfermedadSintomasE){
    return this.http.put(this.url+"/modifica",s);
  }
  listId(id: number) {
    return this.http.get<EnfermedadSintomasE>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  
  //MARCO 1
  getQuantitySintomasxEnfermedad():Observable<QM1DTO[]>{
    return this.http.get<QM1DTO[]>(`${this.url}/listarSintomasPorEnfermedad`)
  } 
}
