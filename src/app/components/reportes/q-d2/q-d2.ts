import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EnfermedadService } from '../../../services/enfermedad';

@Component({
  selector: 'app-q-d2',
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './q-d2.html',
  styleUrl: './q-d2.css',
})
export class QD2Component implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private enfermedadService: EnfermedadService) {}

  ngOnInit(): void {
    const provincia = 'Lima'; // Puedes hacerlo dinámico
    this.enfermedadService
      .getCantidadTransmisionPorProvincia(provincia)
      .subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;

          this.barChartLabels = data.map(
            (item) => `${item.nombreEnfermedad} (${item.transmision})`
          );

          this.barChartData = [
            {
              data: data.map((item) => item.cantidad),
              label: 'Cantidad por tipo de transmisión',
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#C9CBCF',
              ],
              borderColor: '#ccc',
              borderWidth: 1,
            },
          ];
        } else {
          this.hasData = false;
        }
      });
  }
}
