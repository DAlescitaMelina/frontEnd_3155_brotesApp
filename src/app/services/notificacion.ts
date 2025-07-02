import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../models/notificacion';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class NotificacionService  {
  private url=`${base_url}/notificaciones`
  private listaCambio = new Subject<Notificacion[]>();

  constructor(private http:HttpClient) { }
      list() {
        return this.http.get<Notificacion[]>(this.url);
      }
      insert(esintomas: Notificacion) {
        return this.http.post(this.url, esintomas);
      }
      getList() {
        return this.listaCambio.asObservable();
      }
      setList(listaNueva:Notificacion[]) {
        this.listaCambio.next(listaNueva);
      }
      update(n:Notificacion){
        return this.http.put(this.url,n);
      }
      listId(id: number) {
        return this.http.get<Notificacion>(`${this.url}/${id}`);
      }
      delete(id: number) {
        return this.http.delete(`${this.url}/${id}`);
      }
      
}
