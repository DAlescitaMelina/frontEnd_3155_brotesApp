import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Enfermedad } from '../models/enfermedad';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private url=`${base_url}/enfermedades`
  private listaCambio = new Subject<Enfermedad[]>();
  constructor(private http:HttpClient) { }
    list() {
      return this.http.get<Enfermedad[]>(this.url);
    }
    insert(esintomas: Enfermedad) {
      return this.http.post(this.url, esintomas);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Enfermedad[]) {
      this.listaCambio.next(listaNueva);
    }
    update(e:Enfermedad){
      return this.http.put(this.url,e);
    }
    listId(id: number) {
      return this.http.get<Enfermedad>(`${this.url}/${id}`);
    }
    delete(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
