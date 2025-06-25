import { Routes } from '@angular/router';

import { ZonaComponent } from './components/zona/zona';
import { RolComponent } from './components/rol/rol';
import { ContagioComponent } from './components/contagio/contagio';
import { TipoTransmisionComponent } from './components/tipo-transmision/tipo-transmision';

import { InsertareditarComponentZona } from './components/zona/insertareditar/insertareditar';
import { InsertareditarComponentRol } from './components/rol/insertareditar/insertareditar';
import { InsertareditarComponentTipoTransmision } from './components/tipo-transmision/insertareditar/insertareditar';
import { InsertareditarComponentContagio } from './components/contagio/insertareditar/insertareditar';
import { VerpantallaComponent } from './components/pantalla-inicio/verpantalla/verpantalla';
import { EnfermedadComponent } from './components/enfermedad/enfermedad';
import { Insertareditar } from './components/enfermedad/insertareditar/insertareditar';
import { EnfermedadSintomasEComponent } from './components/enfermedad-sintomas-e/enfermedad-sintomas-e';


export const routes: Routes = [
    {
        path:'',redirectTo: 'verinicio',pathMatch:'full' //cuando haya un path en blanco que me redirija a otra ruta
        //de forma automatica a lo que se ponga en redirectTo

    },
    {
        path:'verinicio',component:VerpantallaComponent
    },
    //zonas
    {
        path:'zonas',component:ZonaComponent,
        children:[
        {
            path:'nuevo',component:InsertareditarComponentZona
        },
        {
            path:'ediciones/:id',component:InsertareditarComponentZona

        }
        ]
    },
    //Rol
    {
        path:'roles',component:RolComponent,
        children:[
        {
            path:'nuevo',component:InsertareditarComponentRol
        },
        {
            path:'ediciones/:id',component:InsertareditarComponentRol

        }
        ]
    },
    //tipoTransmision
        {
        path:'tiposT',component:TipoTransmisionComponent,
        children:[
        {
            path:'nuevo',component:InsertareditarComponentTipoTransmision 
        },
        {
            path:'ediciones/:id',component:InsertareditarComponentTipoTransmision

        }
        ]
    },
    //contagios
    {
        path:'contagios',component:ContagioComponent,
        children:[
        {
            path:'nuevo',component:InsertareditarComponentContagio
        },
        {
            path:'ediciones/:id',component:InsertareditarComponentContagio

        }
          
        ]
    },
   { path:'enfermedad',component:EnfermedadComponent,
        children:[
            {path:'nuevo',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ]
     },
     { path:'enfermedadSintomaE',component:EnfermedadSintomasEComponent,
        children:[
            {path:'nuevoESE',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ]
     },

];
