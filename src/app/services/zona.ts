import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Zona } from '../models/zona';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})

export class ZonaService {
  private url=`${base_url}/zonas`
  private listaCambio=new Subject<Zona[]>

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Zona[]>(this.url +"/lista-todo")
  }

  listsina(){
    return this.http.get<Zona[]>(this.url +"/lista-sa")
  }

  insert(z:Zona){
    return this.http.post(this.url+"/inserta",z)
  }

  setList(listaNueva:Zona[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Zona>(`${this.url}/${id}`)
  }

  update(z:Zona){
    return this.http.put(this.url+"/modifica",z)
  }

  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
