import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TipoTransmision } from '../../../models/tipoTransmision';
import { TipoTransmisionService } from '../../../services/tipo-transmision';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listartipo-trasnmision',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule],
  templateUrl: './listartipo-trasnmision.html',
  styleUrl: './listartipo-trasnmision.css'
})
export class ListartipoTrasnmisionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<TipoTransmision>=new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS:TipoTransmisionService){}

  ngOnInit(): void{
    this.tS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator; 

    })
    
    this.tS.getList().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator; 
  })
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.tS.deleteA(id).subscribe(data=>{
      this.tS.list().subscribe(data=>{
        this.tS.setList(data)
      })
    })
  }
}
