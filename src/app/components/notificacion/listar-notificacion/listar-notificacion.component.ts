import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Notificacion } from '../../../models/notificacion';

@Component({
  selector: 'app-listar-notificacion',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listar-notificacion.component.html',
  styleUrl: './listar-notificacion.component.css'
})
export class ListarNotificacionComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource:MatTableDataSource<Notificacion> = new MatTableDataSource()
  constructor(private aS:NotificacionService){}

 ngOnInit(): void {
    this.aS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.aS.getList().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    this.aS.deleteA(id).subscribe(data=>{
      this.aS.list().subscribe(data=>{
        this.aS.setList(data)
      })
    })
  }
}
