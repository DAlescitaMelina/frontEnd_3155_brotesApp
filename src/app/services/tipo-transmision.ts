import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TipoTransmision } from '../models/tipoTransmision';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoTransmisionService {
 private url= `${base_url}/tipoTransmision`
   private listaCambio = new Subject<TipoTransmision[]>();
   constructor(private http:HttpClient) { }
   list() {
     return this.http.get<TipoTransmision[]>(this.url);
   }
   insert(se: TipoTransmision) {
     return this.http.post(this.url, se);
   }
   listId(id: number) {
     return this.http.get<TipoTransmision>(`${this.url}/${id}`);
   }
   getList() {
     return this.listaCambio.asObservable();
   }
   setList(listaNueva:TipoTransmision[]) {
     this.listaCambio.next(listaNueva);
   }
   update(s:TipoTransmision){
     return this.http.put(this.url,s);
   }
   delete(id: number) {
     return this.http.delete(`${this.url}/${id}`);
   }
 
 }