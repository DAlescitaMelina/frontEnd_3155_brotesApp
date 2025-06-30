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
  private url=`${base_url}/contagios`
  private listaCambio = new Subject<Contagios[]>();

  constructor(private http:HttpClient) { }

    list(){
      return this.http.get<Contagios[]>(this.url +"/lista")
    }
  
    insert(c:Contagios){
      return this.http.post(this.url+"/inserta",c)
    }
  
    setList(listaNueva:Contagios[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id:number){
      return this.http.get<Contagios>(`${this.url}/${id}`)
    }
  
    update(c:Contagios){
      return this.http.put(this.url+"/modifica",c)
    }
  
    deleteA(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }

}
