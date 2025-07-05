import { Component,ViewChild } from '@angular/core'; 
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BrotesService } from '../../../services/brotes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-q2bdto',
  standalone: true,
  imports: [
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './q2bdto.html',
  styleUrl: './q2bdto.css'
})
export class Q2bdto  {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective; // <-- AGREGA ESTO

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;

  isLoading = false;

  constructor(private aS: BrotesService, private snackBar: MatSnackBar) {}

  
 loadChartData(): void {
  if (!this.anio || !this.mes || this.mes < 1 || this.mes > 12) {
    this.snackBar.open('Por favor ingresa un año y mes válidos.', 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
    return;
  }

  this.isLoading = true;

  this.aS.getQuantityBrotesTotales(this.anio, this.mes).subscribe(
    data => {
      this.isLoading = false;

      if (data.length === 0) {
        this.barChartLabels = [];
        this.barChartData = [];
        this.snackBar.open(`No hay datos por mostrar para la fecha seleccionada.`, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-warning']
        });
      } else {
        this.barChartLabels = data.map(item => item.nameProvincia);

        this.barChartData = [
          {
            data: data.map(item => item.quantityBrotesTotales),
            label: 'Cantidad de brotes totales',
            backgroundColor: [
              '#4E79A7',   
              '#A7EDE7',   
              '#F28E2B',   
              '#FFBE7D'   
            ],
            borderColor: '#00008B',
            borderWidth: 1
          }
        ];

        this.chart?.update();
      }
    },
    error => {
      this.isLoading = false;
      console.error('Error al cargar datos:', error);
      this.snackBar.open('No se pudo obtener la información.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  );
}
}