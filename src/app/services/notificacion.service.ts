import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../models/notificacion';
import { QWDTO1 } from '../models/q_w1dto';
const base_url=environment.base

export interface NotificacionPerDTO {
  idNotificacion: number;
  fechaEnvio: string;
  estado: string;
  titulo: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private url=`${base_url}/notificaciones`
  constructor(private http:HttpClient) { }
  private listaCambio=new Subject<Notificacion[]>

list() {
  return this.http.get<Notificacion[]>(`${this.url}/lista-todo`);
}

  insert(a:Notificacion){
    return this.http.post(`${this.url}/inserta`, a)
  }

  setList(listaNueva:Notificacion[]){
   this.listaCambio.next(listaNueva)
  }

  getList(){
  return this.listaCambio.asObservable()
  }
  listId(id:number){
    return this.http.get<Notificacion>(`${this.url}/${id}`)
  }

  update(ar:Notificacion){
    return this.http.put(`${this.url}/modifica`, ar)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  //q_w1dto
      getqw1():Observable<QWDTO1[]>{
        return this.http.get<QWDTO1[]>(this.url+"/CantidadUsuarios_Notificados")
      }
  
  listarNotificacionesPorPersona(): Observable<NotificacionPerDTO[]> {
    return this.http.get<NotificacionPerDTO[]>(this.url+"/lista-cadapersona");
  }
}
