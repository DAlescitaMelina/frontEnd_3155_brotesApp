import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Brotes } from '../models/brotes';
import { cantidadBrotesTotalesDTO } from '../models/q_2bdto';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class BrotesService {
  private url=`${base_url}/brotes`
  constructor(private http:HttpClient) { }
  private listaCambio=new Subject<Brotes[]>

list() {
  return this.http.get<Brotes[]>(`${this.url}/lista`);
}

  insert(a:Brotes){
    return this.http.post(`${this.url}/inserta`, a)
  }

  setList(listaNueva:Brotes[]){
   this.listaCambio.next(listaNueva)
  }

  getList(){
  return this.listaCambio.asObservable()
  }
  listId(id:number){
    return this.http.get<Brotes>(`${this.url}/${id}`)
  }

  update(ar:Brotes){
    return this.http.put(`${this.url}/modifica`, ar)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  
  //BROTES>>cantidadBrotesActivosPorZonaDTO  
    getQuantityBrotesTotales(anio: number, mes: number):Observable<cantidadBrotesTotalesDTO[]>{
        return this.http.get<cantidadBrotesTotalesDTO[]>(`${this.url}/cantidadBrotesTotales`, {
      params: {
      anio: anio.toString(),
      mes: mes.toString(),
    },
  });
}
}