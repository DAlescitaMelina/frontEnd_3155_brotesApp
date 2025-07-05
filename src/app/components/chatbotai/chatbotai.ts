import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChatbotdialogComponent } from './chatbotdialog/chatbotdialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chatbotai',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './chatbotai.html',
  styleUrl: './chatbotai.css'
})

export class ChatbotaiComponent {
  constructor(private dialog: MatDialog) {}

  abrirchat() {
  this.dialog.open(ChatbotdialogComponent, {
    width: '950px',
    height: '800px',
    panelClass: 'chatbot-modal'
    
  });
}
}
