import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Prevenciones } from '../models/prevenciones';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PrevencionesService  {
  private url=`${base_url}/prevenciones`
  private listaCambio = new Subject<Prevenciones[]>();
  constructor(private http:HttpClient) { }
  list() {
      return this.http.get<Prevenciones[]>(this.url);
    }
    listId(id: number) {
      return this.http.get<Prevenciones>(`${this.url}/${id}`);
    }
    update(p:Prevenciones){
      return this.http.put(this.url,p);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Prevenciones[]) {
      this.listaCambio.next(listaNueva);
    }
}
