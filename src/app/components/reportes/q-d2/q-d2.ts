import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ChartDataset, ChartOptions, ChartType, ChartData } from 'chart.js';
import { EnfermedadService } from '../../../services/enfermedad';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-q-d2',
  imports: [BaseChartDirective,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    BaseChartDirective,],
  templateUrl: './q-d2.html',
  styleUrl: './q-d2.css',
})
export class QD2Component implements OnInit {
  provincia: string = '';
  fueBuscado: boolean = false;
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y', // opcional: cambia a horizontal
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;

  /*barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];*/
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private enfermedadService: EnfermedadService) {}

  ngOnInit(): void {
    // No carga nada hasta que el usuario busque
  }

  buscarPorProvincia(): void {
    const prov = this.provincia.trim();
    if (!prov) return;

    this.enfermedadService.getCantidadTransmisionPorProvincia(prov).subscribe((data) => {
      this.fueBuscado = true;
      if (data.length > 0) {
        this.hasData = true;

        this.barChartData = {
          labels: data.map(
            (item) => `${item.nombreEnfermedad} (${item.transmision})`
          ),
          datasets: [
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
          ],
        };
      } else {
        this.hasData = false;
        this.barChartData = {
          labels: [],
          datasets: [],
        };
      }
    });
  }
}
