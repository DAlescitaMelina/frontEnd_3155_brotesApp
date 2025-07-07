import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Prevenciones } from '../models/prevenciones';
import { QM2DTO } from '../models/q_m2dto'; 
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PrevencionesService  {
  private url=`${base_url}/prevenciones`
  private listaCambio = new Subject<Prevenciones[]>();
  constructor(private http:HttpClient) { }
  list() {
      return this.http.get<Prevenciones[]>(this.url);
    }
    listId(id: number) {
      return this.http.get<Prevenciones>(`${this.url}/${id}`);
    }
    insert(p:Prevenciones){
      return this.http.post(this.url+"/inserta",p)
    }
        
    update(p:Prevenciones){
      return this.http.put(this.url,p);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Prevenciones[]) {
      this.listaCambio.next(listaNueva);
    }

      //MARCO 2
      getQuantityPrevencionxTipoEnfermedad():Observable<QM2DTO[]>{
        return this.http.get<QM2DTO[]>(`${this.url}/listarPrevencionesPorEnfermedad`)
      } 
}
