import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UsuarioRegistro } from '../models/usuario-registro';
import { Usuario } from '../models/usuario';
import { UsuarioModi } from '../models/usuario-modi';
import { QTDTO1 } from '../models/q_t1dto';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {
  private url=`${base_url}/usuarios`
  private listaCambio = new Subject<Usuario[]>();

  constructor(private http:HttpClient) { }

    insert(u:UsuarioRegistro){
      return this.http.post(this.url+"/registro-usuarios",u)
    }

    list() {
      return this.http.get<Usuario[]>(this.url +"/lista")
    }
    listId(id: number) {
      return this.http.get<Usuario>(`${this.url}/${id}`);
    }
    update(u:UsuarioModi){
      return this.http.put(this.url+"/modifica",u);
    }

    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Usuario[]) {
      this.listaCambio.next(listaNueva);
    }
    
    getQW1(): Observable<QTDTO1[]> {
    return this.http.get<QTDTO1[]>(`${this.url}/cantidad-usuarios-zona`);
    }
}
