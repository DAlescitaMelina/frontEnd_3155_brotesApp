import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class Usuario {
  private url=`${base_url}/usuarios`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Usuario[]>(this.url)
  }
}
