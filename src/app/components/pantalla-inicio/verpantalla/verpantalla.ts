import { Component } from '@angular/core';

@Component({
  selector: 'app-verpantalla',
  imports: [],
  templateUrl: './verpantalla.html',
  styleUrl: './verpantalla.css'
})
export class VerpantallaComponent {
  currentIndex = 0;

  moveCarousel(direction: number): void {
    const items = document.querySelectorAll('.carousel-item');
    items[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + direction + items.length) % items.length;
    items[this.currentIndex].classList.add('active');
  }
  enviarCorreo(): void {
    window.location.href = 'mailto:comapp@outlook.com';
  }
}

