import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-notificacion',
  standalone: true,
  templateUrl: './listar-notificacion.component.html',
  styleUrls: ['./listar-notificacion.component.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ]
})
export class ListarNotificacionComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private aS: NotificacionService) {}

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number): void {
    this.aS.deleteA(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      });
    });
  }
}

