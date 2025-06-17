import { Routes } from '@angular/router';
import { ZonaComponent } from './components/zona/zona';
import { RolComponent } from './components/rol/rol';
import { InsertareditarComponentZona } from './components/zona/insertareditar/insertareditar';
import { InsertareditarComponentRol } from './components/rol/insertareditar/insertareditar';

export const routes: Routes = [
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
        ],
    }
];
