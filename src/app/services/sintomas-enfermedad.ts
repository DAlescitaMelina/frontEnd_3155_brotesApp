import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { sintomasEnfermedad } from '../models/sintomasEnfermedad';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class SintomasEnfermedadService  {
  private url=`${base_url}/sintomasE`
  private listaCambio = new Subject<sintomasEnfermedad[]>();
  constructor(private http:HttpClient) { }
  list() {
      return this.http.get<sintomasEnfermedad[]>(this.url);
    }
    listId(id: number) {
      return this.http.get<sintomasEnfermedad>(`${this.url}/${id}`);
    }
    update(se:sintomasEnfermedad){
      return this.http.put(this.url,se);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:sintomasEnfermedad[]) {
      this.listaCambio.next(listaNueva);
    }
}
