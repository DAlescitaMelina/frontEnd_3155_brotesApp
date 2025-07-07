import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8081/login', request);
  }

  verificar() {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      return token != null;
    }
    return false; // Si estamos en SSR, no hay token
  }

  showRole() {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return null; // Si no hay token, retorna null
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.role;
    }
    return null; // Si es SSR, retorna null
  }

  getNombreUsuario(): string {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return 'Invitado';
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.sub || 'Usuario'; // 'sub' es típico para el username en JWT
    }
getIdUsuario(): Observable<number> {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return of(0); // o `of(null)` si preferís usar `null` como vacío
  }

  const helper = new JwtHelperService();
  const username = helper.decodeToken(token)?.sub;

  return this.http.get<any>(`http://localhost:8081/usuario/poruser/${username}`)
    .pipe(map(usuario => usuario?.idUsuario || 0));
}

}

