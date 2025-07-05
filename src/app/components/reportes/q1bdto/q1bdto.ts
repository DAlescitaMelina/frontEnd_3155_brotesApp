import { ChartDataset, ChartOptions, ChartType } from 'chart.js';  
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ContagiosService } from '../../../services/contagios';
 

@Component({
  selector: 'app-q1bdto',
  imports: [BaseChartDirective],
  templateUrl: './q1bdto.html',
  styleUrl: './q1bdto.css'
})
export class Q1bdto implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private aS:ContagiosService){}
  ngOnInit(): void {
      this.aS.getQuantityBrotesActivosxZona().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.nameProvincia),
        this.barChartLabels=data.map(item=>item.nameDistrito)
        this.barChartData=[
          {
            data:data.map(item=>item.quantityBrotes),
            label:'Cantidad de brotes activos por zona',
            backgroundColor:[
              '#4E79A7',  // Azul
              '#9F7AEA',  // Morado
              '#F58CA0',  // Rosa
              '#E74C3C'   // Rojo
  
            ],
            borderColor:'#00008B',
            borderWidth:1
          }
          
        ]
      })
  }
}
