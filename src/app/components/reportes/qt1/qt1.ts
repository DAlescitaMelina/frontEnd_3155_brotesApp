import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { UsuarioService } from '../../../services/usuario';
import { ContagiosService } from '../../../services/contagios';
import { QTDTO1 } from '../../../models/q_t1dto';
import { QTDTO2 } from '../../../models/q_t2dto';

@Component({
  selector: 'app-qt1',
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './qt1.html',
  styleUrl: './qt1.css'
})
export class Qt1Component implements OnInit {
  
  // Columnas para cada tabla
  displayedColumns1: string[] = ['distrito', 'cantidadUsuarios'];
  displayedColumns2: string[] = ['distrito', 'cantidadContagios'];

  // DataSources
  dataSource1 = new MatTableDataSource<QTDTO1>();
  dataSource2 = new MatTableDataSource<QTDTO2>();

  // Paginadores
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private contagiosService: ContagiosService
  ) {}

  ngOnInit(): void {
  
    this.usuarioService.getQW1().subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.paginator = this.paginator1;
    });

    this.contagiosService.getQW2().subscribe(data => {
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator2;
    });
  }


}
