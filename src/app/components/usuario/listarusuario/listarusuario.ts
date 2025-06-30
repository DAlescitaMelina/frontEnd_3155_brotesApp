import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario';
import { UsuarioRegistro } from '../../../models/usuario-registro';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule,MatPaginatorModule],
  templateUrl: './listarusuario.html',
  styleUrl: './listarusuario.css'
})
export class Listarusuario implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS:UsuarioService){ }

  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator; 
      })
      this.uS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator; 
      })
    }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
    
    eliminar(id:number){
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}
