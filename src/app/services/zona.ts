import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class Zona {
  private url=`${base_url}/zonas`
  constructor(private http: HttpClient) { }
}
