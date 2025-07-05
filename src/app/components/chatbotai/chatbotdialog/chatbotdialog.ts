import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  standalone: true,
  selector: 'app-chatbotdialog',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './chatbotdialog.html',
  styleUrl: './chatbotdialog.css'
})
export class ChatbotdialogComponent {
  constructor(private cs: ChatbotService, private cd: ChangeDetectorRef) {}

mensaje: string = '';
historial: { texto: string, tipo: 'usuario' | 'bot' }[] = [];

enviar() {
    if (!this.mensaje.trim()) return;

    this.historial.push({ texto: this.mensaje, tipo: 'usuario' });

    this.cs.enviarMensaje(this.mensaje).subscribe(respuesta => {
      this.historial.push({ texto: respuesta, tipo: 'bot' });
      this.mensaje = '';
      this.cd.detectChanges();
    }, error => {
      this.historial.push({
        texto: 'Hubo un problema...',
        tipo: 'bot'
      });
      this.cd.detectChanges();
    });
  }
}
