import { Component, OnInit } from '@angular/core';
import { Enfermedad } from '../../../models/enfermedad';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EnfermedadService } from '../../../services/enfermedad';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listarenfermedad',
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './listarenfermedad.html',
  styleUrls: ['./listarenfermedad.css'],
})

export class ListarenfermedadComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource();

  constructor(private eS: EnfermedadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.eS.setList(data);
    });

    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.list().subscribe((data) => {
      this.eS.setList(data); // Actualiza el observable reactivo
    });
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
      this.snackBar.open('Enfermedad eliminada correctamente', 'Cerrar', {
        duration: 3000, // duración en milisegundos
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
        this.dataSource.data = data;
      });
    });
  }
}
