import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class SintomasEnfermedad {
  private url=`${base_url}/sintomasE`
  constructor(private http:HttpClient) { }
}
