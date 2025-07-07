import { Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EnfermedadService } from '../../../services/enfermedad';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-q-d1',
  imports: [
    BaseChartDirective,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    BaseChartDirective,
  ],
  templateUrl: './q-d1.html',
  styleUrl: './q-d1.css',
})
export class QD1 implements OnInit {
  provincia: string = '';
  fueBuscado: boolean = false;
  hasData: boolean = false;
  totalEnfermedades: number = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'doughnut';
  barChartLegend = true;

  barChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  constructor(private enfermedadService: EnfermedadService) {}

  ngOnInit(): void {
    // Puedes inicializar con una búsqueda por defecto si lo deseas
    // this.provincia = 'Lima';
    // this.buscarPorProvincia();
  }

  buscarPorProvincia(): void {
    const provincia = this.provincia.trim();
    if (!provincia) return;

    this.enfermedadService
      .getCantidadPorProvincia(provincia)
      .subscribe((data) => {
        this.fueBuscado = true;
        if (data.length > 0) {
          this.hasData = true;
          this.totalEnfermedades = data.reduce(
            (sum, item) => sum + item.cantidadEnfermedades,
            0
          );

          this.barChartData = {
            labels: data.map((item) => item.provincia),
            datasets: [
              {
                data: data.map((item) => item.cantidadEnfermedades),
                label: 'Cantidad de enfermedades por provincia',
                backgroundColor: [
                  '#4682B4',
                  '#4169E1',
                  '#ADD8E6',
                  '#5F9EA0',
                  '#6A5ACD',
                  '#40E0D0',
                  '#87CEEB',
                ],
                borderColor: 'rgba(173, 216, 230, 1)',
                borderWidth: 1,
              },
            ],
          };
        } else {
          this.hasData = false;
          this.totalEnfermedades = 0;
          this.barChartData = {
            labels: [],
            datasets: [],
          };
        }
      });
  }
}
