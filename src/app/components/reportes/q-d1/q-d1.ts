import { Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EnfermedadService } from '../../../services/enfermedad';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-q-d1',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './q-d1.html',
  styleUrl: './q-d1.css',
})
export class QD1 implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private enfermedadService: EnfermedadService) {}

  ngOnInit(): void {
    const provincia = 'Lima'; // Puedes cambiar esto dinámicamente
    this.enfermedadService
      .getCantidadPorProvincia(provincia)
      .subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map((item) => item.provincia);
          this.barChartData = [
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
          ];
        } else {
          this.hasData = false;
        }
      });
  }
}
