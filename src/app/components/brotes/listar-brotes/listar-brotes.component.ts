import { Component, OnInit, ViewChild } from '@angular/core';
import { Brotes } from '../../../models/brotes';
import { BrotesService } from '../../../services/brotes.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-brotes',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listar-brotes.component.html',
  styleUrl: './listar-brotes.component.css'
})
export class ListarBrotesComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Brotes> = new MatTableDataSource<Brotes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS: BrotesService) {}

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; // Enlazar el paginador
    });

    // Enlace si la lista se actualiza por fuera (setList)
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