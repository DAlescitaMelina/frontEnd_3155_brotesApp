import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoEnfermedad {
  private url=`${base_url}/tiposE`
  constructor(private http:HttpClient) { }
}
