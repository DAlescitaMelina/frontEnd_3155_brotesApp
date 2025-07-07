import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import maplibregl from 'maplibre-gl';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarComponentZona implements OnInit {
  form:FormGroup=new FormGroup({})
  zona:Zona=new Zona()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private zS:ZonaService,
    private router:Router,
    private route:ActivatedRoute,
    private http:HttpClient
  ){}

//mapaaaaaaaaaaaaaaaaaaa
initMap(): void {
  const container = document.getElementById('map');

  if (container) {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-77.0428, -12.0464],
      zoom: 12
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    let marker: maplibregl.Marker | null = null; 

    map.on('click', (e) => {
      const lat = Number(e.lngLat.lat.toFixed(6))
      const lng = Number(e.lngLat.lng.toFixed(6));

      this.form.get('latitud')?.setValue(lat);
      this.form.get('longitud')?.setValue(lng);
      this.obtenerUbicacion(lat,lng)

      //  Eliminar marcador anterior si existe
      if (marker) {
        marker.remove();
      }

      //  Crear nuevo marcador
      marker = new maplibregl.Marker({ color: 'purple' })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setText(`Lat: ${lat.toFixed(5)} | Lng: ${lng.toFixed(5)}`))
        .addTo(map);
    });
  }
}

  //geodecodificacion - provincia y distrito
  obtenerUbicacion(lat: number, lng: number): void {
  const apiKey = 'cc3db89afed04f6fba3759a8b0dd7392';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  this.http.get<any>(url).subscribe(res => {
    const resultado = res.results[0];
    const comp = resultado.components;

    const provincia = comp.state || comp.region || '';
    const distrito = comp.city || comp.town || comp.suburb || comp.village || '';

    this.form.get('provincia')?.setValue(provincia);
    this.form.get('distrito')?.setValue(distrito);

    console.log('Ubicación obtenida:', provincia, distrito);
  });
}


  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id']
        this.edicion=data['id']!=null
        this.init()
      })


      this.form=this.formBuilder.group({
        codigo:[''],
        provincia:['',Validators.required],
        distrito:['',Validators.required],
        latitud:['',Validators.required],
        longitud:['',Validators.required]
      })

      this.initMap()
  } 
  aceptar(){
    if(this.form.valid){
      this.zona.idZona=this.form.value.codigo
      this.zona.provincia=this.form.value.provincia
      this.zona.distrito=this.form.value.distrito
      this.zona.latitud=this.form.value.latitud
      this.zona.longitud=this.form.value.longitud
      if(this.edicion){
          this.zS.update(this.zona).subscribe(data=>{
            this.zS.list().subscribe(data=>{
              this.zS.setList(data)
            })
          })
      }else{
          this.zS.insert(this.zona).subscribe(()=>{
                    this.zS.list().subscribe(data=>{
                      this.zS.setList(data)
                    })
                  })
      }
      this.router.navigate(['zonas'])     
    }
  }

  init(){
    if(this.edicion){
      this.zS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idZona),
          provincia:new FormControl(data.provincia),
          distrito:new FormControl(data.distrito),
          latitud: new FormControl(data.latitud),
          longitud:new FormControl(data.longitud)
        })
      })
    }
    
  }


}
