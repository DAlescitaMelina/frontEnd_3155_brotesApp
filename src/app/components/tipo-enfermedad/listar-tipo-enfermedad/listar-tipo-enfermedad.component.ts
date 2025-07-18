import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoEnfermedad } from '../../../models/tipoEnfermedad';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TipoEnfermedadService } from '../../../services/tipoEnfermedad.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-tipo-enfermedad',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatPaginatorModule],
  templateUrl: './listar-tipo-enfermedad.component.html',
  styleUrl: './listar-tipo-enfermedad.component.css'
})
export class ListarTipoEnfermedadComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<TipoEnfermedad> = new MatTableDataSource<TipoEnfermedad>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS: TipoEnfermedadService) {}

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
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.aS.setList(data);
      });
    });
  }
}
