import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDhqYecpRZXOS3gr2oLGZ0LNMmV97u1KlY'; // 🔑 como parámetro

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<string> {
    const prompt = `Actúas como un epidemiológico. Respondes en tono profesional y respetuoso, trate de ser breve y no haga repeticiones.  El paciente pregunta: ${mensaje}`;
    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    return this.http.post<any>(this.endpoint, body, { headers }).pipe(
      map(res => res.candidates[0]?.content?.parts[0]?.text || '[Respuesta vacía]')
    );
  }
}
