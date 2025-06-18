import { Routes } from '@angular/router';
import { ZonaComponent } from './components/zona/zona';
import { RolComponent } from './components/rol/rol';
import { InsertareditarComponentZona } from './components/zona/insertareditar/insertareditar';
import { InsertareditarComponentRol } from './components/rol/insertareditar/insertareditar';
import { VerpantallaComponent } from './components/pantalla-inicio/verpantalla/verpantalla';


export const routes: Routes = [
    {
        path:'',redirectTo: 'verinicio',pathMatch:'full' //cuando haya un path en blanco que me redirija a otra ruta
        //de forma automatica a lo que se ponga en redirectTo

    },
    {
        path:'verinicio',component:VerpantallaComponent
    },
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
    }
];
