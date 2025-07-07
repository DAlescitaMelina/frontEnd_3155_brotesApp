import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NotificacionPerDTO, NotificacionService } from '../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource = new MatTableDataSource<NotificacionPerDTO>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  notificacionesCargadas: boolean = false;
  nombreUsuario: string = '';
  idusuario: number=0
  notificaciones:NotificacionPerDTO[]=[]

  constructor(private loginService: LoginService,
    private notiservice: NotificacionService
  ) {}

  ngOnInit(): void {
    this.notiservice.listarNotificacionesPorPersona().subscribe(data => {
      this.notificacionesCargadas=true
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });

    this.nombreUsuario = this.loginService.getNombreUsuario();
    console.log(this.nombreUsuario)


  }

}