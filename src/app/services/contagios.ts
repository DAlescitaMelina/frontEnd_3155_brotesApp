import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contagios } from '../models/contagios';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ContagiosService  {
  private url= `${base_url}/contagios`
  private listaCambio = new Subject<Contagios[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Contagios[]>(this.url);
  }
  insert(se: Contagios) {
    return this.http.post(this.url, se);
  }
  listId(id: number) {
    return this.http.get<Contagios>(`${this.url}/${id}`);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Contagios[]) {
    this.listaCambio.next(listaNueva);
  }
  update(s:Contagios){
    return this.http.put(this.url,s);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
