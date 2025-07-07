import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import maplibregl from 'maplibre-gl';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarzona',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, MatPaginatorModule],
  templateUrl: './listarzona.html',
  styleUrl: './listarzona.css'
})
export class Listarzona implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Zona> = new MatTableDataSource();
  private map: maplibregl.Map | undefined;
  private markers: maplibregl.Marker[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private zS: ZonaService) {}
  

  ngOnInit(): void {
    
    this.initMap();

    this.zS.getList().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

    // Limpiar marcadores viejos
    this.markers.forEach(m => m.remove())
    this.markers = []

    //añadiendo marcadores
    const zonasValidas = data.filter(z =>
      z.latitud !== null &&
      z.longitud !== null &&
      z.latitud >= -90 && z.latitud <= 90 &&
      z.longitud >= -180 && z.longitud <= 180
    )

    zonasValidas.forEach(z => {
      const marker = new maplibregl.Marker({ color: 'blue' }) 
        .setLngLat([z.longitud, z.latitud])
        .setPopup(new maplibregl.Popup().setText(`ID: ${z.idZona} - ${z.provincia} - ${z.distrito}`))
        .addTo(this.map!)

      this.markers.push(marker)
    })
    })

    this.zS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.zS.setList(data);
    });

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  initMap(): void {
    const container = document.getElementById('map');

    if (this.map) {
      this.map.remove();
    }

    if (container) {
      this.map = new maplibregl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [-77.0428, -12.0464],
        zoom: 12
      });

      this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
      
    }
  }

  eliminar(id: number): void {
    this.zS.deleteA(id).subscribe(data => {
      this.zS.list().subscribe(data => {
        this.zS.setList(data);
      });
    });
  }
}