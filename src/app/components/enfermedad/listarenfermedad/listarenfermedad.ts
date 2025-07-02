import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../../models/enfermedad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EnfermedadService } from '../../../services/enfermedad';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarenfermedad',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarenfermedad.html',
  styleUrls: ['./listarenfermedad.css'],
})
export class ListarenfermedadComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource();

  constructor(private eS: EnfermedadService) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.list().subscribe((data) => {
      this.eS.setList(data); // Actualiza el observable reactivo
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
