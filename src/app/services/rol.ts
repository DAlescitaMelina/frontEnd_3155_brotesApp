import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Rol } from '../models/rol';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url=`${base_url}/roles`
  private listaCambio=new Subject<Rol[]>
  
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Rol[]>(this.url +"/lista")
  }

  insert(z:Rol){
    return this.http.post(this.url+"/inserta",z)
  }

  setList(listaNueva:Rol[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Rol>(`${this.url}/${id}`)
  }

  update(z:Rol){
    return this.http.put(this.url+"/modifica",z)
  }

}
