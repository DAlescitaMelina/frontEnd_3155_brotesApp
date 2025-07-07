import { Component } from '@angular/core';
import { PrevencionesService } from '../../../services/prevenciones';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-q-m2',
  imports: [CommonModule],
  templateUrl: './q-m2.html',
  styleUrl: './q-m2.css'
})
export class QM2 {
 datosTabla: any[] = [];

  constructor(private aS: PrevencionesService) {}

  ngOnInit(): void {
    this.aS.getQuantityPrevencionxTipoEnfermedad().subscribe(data => {
      this.datosTabla = data;
    });
  }
}
