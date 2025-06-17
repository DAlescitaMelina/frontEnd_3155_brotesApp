import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Zona } from '../models/zona';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ZonaService  {
  private url=`${base_url}/zonas`
  private listaCambio = new Subject<Zona[]>();
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<Zona[]>(this.url);
    }
    listId(id: number) {
      return this.http.get<Zona>(`${this.url}/${id}`);
    }
    update(z:Zona){
      return this.http.put(this.url,z);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Zona[]) {
      this.listaCambio.next(listaNueva);
    }
}
