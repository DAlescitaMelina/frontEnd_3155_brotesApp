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
  private url=`${base_url}/tiposT`
  private listaCambio=new Subject<TipoTransmision[]>
  constructor(private http:HttpClient) { }

    list(){
      return this.http.get<TipoTransmision[]>(this.url +"/lista")
    }
  
    insert(ta:TipoTransmision){
      return this.http.post(this.url+"/inserta",ta)
    }
  
    setList(listaNueva:TipoTransmision[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id:number){
      return this.http.get<TipoTransmision>(`${this.url}/${id}`)
    }
  
    update(ta:TipoTransmision){
      return this.http.put(this.url+"/modifica",ta)
    }
  
    deleteA(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }

}
