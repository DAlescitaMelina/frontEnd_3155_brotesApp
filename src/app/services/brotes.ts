import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Brotes } from '../models/brotes';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class BrotesService  {
  private url=`${base_url}/brotes`
  private listaCambio = new Subject<Brotes[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Brotes[]>(this.url);
  }
  listId(id: number) {
    return this.http.get<Brotes>(`${this.url}/${id}`);
  }
  update(b:Brotes){
    return this.http.put(this.url,b);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Brotes[]) {
    this.listaCambio.next(listaNueva);
  }
}
