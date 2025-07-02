import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { QWDTO1 } from '../../../models/q_w1dto';
import { NotificacionService } from '../../../services/notificacion.service';
import { TipoTransmisionService } from '../../../services/tipo-transmision';
import { QWDTO2 } from '../../../models/q_w2dto';

@Component({
  selector: 'app-qw1',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './qw1.html',
  styleUrl: './qw1.css'
})
export class Qw1Component implements OnInit{
displayedColumns: string[] = ['c1', 'c2', 'c3'];

dataSource1:MatTableDataSource<QWDTO1>=new MatTableDataSource()
dataSource2:MatTableDataSource<QWDTO2>=new MatTableDataSource()

@ViewChild('paginator1') paginator1!: MatPaginator;
@ViewChild('paginator2') paginator2!: MatPaginator;


  constructor(
    private qS:NotificacionService,
    private ts:TipoTransmisionService
  ){}
  

  ngOnInit(): void{
    //qw1
    this.qS.getqw1().subscribe(data=>{
      //console.log(' Datos:', data);
      this.dataSource1=new MatTableDataSource(data)
      this.dataSource1.paginator=this.paginator1
    })
    //qw2
    this.ts.getqw2().subscribe(data=>{
      //console.log(' Datos:', data);
      this.dataSource2=new MatTableDataSource(data)
      this.dataSource2.paginator=this.paginator2
    })

  }
}
