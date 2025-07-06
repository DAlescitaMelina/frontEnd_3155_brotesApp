import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Enfermedad } from '../models/enfermedad';
import { Observable, Subject } from 'rxjs';
import { cantidadEnfermedad } from '../models/q_d1dto';
import { cantidadEnfermedadTransmision } from '../models/q_d2dto';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class EnfermedadService {
  private url = `${base_url}/enfermedades`;
  private listaCambio = new Subject<Enfermedad[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Enfermedad[]>(`${this.url}/lista`);
  }
  insert(esintomas: Enfermedad) {
    return this.http.post(`${this.url}/inserta`, esintomas);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Enfermedad[]) {
    this.listaCambio.next(listaNueva);
  }
  update(e: Enfermedad) {
    return this.http.put(`${this.url}/modifica`, e);
  }
  listId(id: number) {
    return this.http.get<Enfermedad>(`${this.url}/${id}`);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getCantidadPorProvincia(provincia: string): Observable<cantidadEnfermedad[]> {
    const params = { provincia };
    return this.http.get<cantidadEnfermedad[]>(
      `${this.url}/cantidad-enfermedades-provincia`,
      { params }
    );
  }
  getCantidadTransmisionPorProvincia(provincia: string): Observable<cantidadEnfermedadTransmision[]> {
  const params = { provincia };
  return this.http.get<cantidadEnfermedadTransmision[]>(
    `${this.url}/cantidad-transmision-provincia`,
    { params }
  );
}

}
