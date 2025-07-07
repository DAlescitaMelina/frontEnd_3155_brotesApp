import { Component, OnInit, ViewChild } from '@angular/core'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PrevencionesService } from '../../../services/prevenciones';
import { Prevenciones } from '../../../models/prevenciones';

@Component({
  selector: 'app-listar-prevencion',
  standalone: true,
  templateUrl: './listar-prevencion.component.html',
  styleUrls: ['./listar-prevencion.component.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ]
})
export class ListarPrevencionComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  dataSource: MatTableDataSource<Prevenciones> = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private aS: PrevencionesService) {}

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
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
      });
    });
  }
}