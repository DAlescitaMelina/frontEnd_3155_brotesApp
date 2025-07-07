import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NotificacionPerDTO, NotificacionService } from '../../services/notificacion.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import maplibregl from 'maplibre-gl';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule]
})
export class Home implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource = new MatTableDataSource<NotificacionPerDTO>();
  mapa: any;
  latitud: number = 0;
  longitud: number = 0;
  nombrezona: string = '';
  nombreUsuario: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private loginService: LoginService,
    private notiservice: NotificacionService,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.nombreUsuario = this.loginService.getNombreUsuario();

    this.notiservice.listarNotificacionesPorPersona().subscribe(notifs => {
      this.dataSource = new MatTableDataSource(notifs);
      this.dataSource.paginator = this.paginator;

      const hayNotificaciones = notifs.length > 0;

      this.uS.getZonaYUsuario().subscribe(info => {
        this.latitud = Number(info.latitud);
        this.longitud = Number(info.longitud);
        this.nombrezona = info.nombreZona;

        this.initMap(hayNotificaciones);
      });
    });
  }

  initMap(hayNotificaciones: boolean): void {
    const container = document.getElementById('map');
    if (!container) return;

    this.mapa = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [this.longitud, this.latitud],
      zoom: 14
    });

    this.mapa.addControl(new maplibregl.NavigationControl(), 'top-right');

    this.mapa.on('load', () => {
      new maplibregl.Marker({ color: '#1976d2' })
        .setLngLat([this.longitud, this.latitud])
        .setPopup(new maplibregl.Popup().setHTML(`
          <div style="text-align:center;">
            <strong>Estás en:</strong> ${this.nombrezona} <br>
            <small>Lat: ${this.latitud.toFixed(5)} | Lng: ${this.longitud.toFixed(5)}</small>
          </div>
        `))
        .addTo(this.mapa);

      if (hayNotificaciones) {
        this.agregarCapaAlertaGeografica(1000); // tamaño
      }
    });
  }

  agregarCapaAlertaGeografica(radiusInMeters: number): void {
    const capaId = 'notificacion-area';
    if (this.mapa.getLayer(capaId)) this.mapa.removeLayer(capaId);
    if (this.mapa.getSource(capaId)) this.mapa.removeSource(capaId);

    const puntos = 130;
    const coords = [];
    for (let i = 0; i < puntos; i++) {
      const angulo = (i * 360) / puntos;
      const dx = radiusInMeters * Math.cos(angulo * Math.PI / 180) / 111320;
      const dy = radiusInMeters * Math.sin(angulo * Math.PI / 180) / 111320;
      coords.push([this.longitud + dx, this.latitud + dy]);
    }
    coords.push(coords[0]); 

    const geojson = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      }
    };

    this.mapa.addSource(capaId, {
      type: 'geojson',
      data: geojson
    });

    this.mapa.addLayer({
      id: capaId,
      type: 'fill',
      source: capaId,
      paint: {
        'fill-color': '#ff0000',
        'fill-opacity': 0.45
      }
    });
  }
}
