import { Component, OnInit } from '@angular/core';
import { EnfermedadSintomasEService } from '../../../services/enfermedad-sintomas-e';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-q-m1',
  imports: [CommonModule],
  templateUrl: './q-m1.html',
  styleUrl: './q-m1.css'
})
export class QM1 implements OnInit {
  datosTabla: any[] = [];

  constructor(private aS: EnfermedadSintomasEService) {}

  ngOnInit(): void {
    this.aS.getQuantitySintomasxEnfermedad().subscribe(data => {
      this.datosTabla = data;
    });
  }
}
