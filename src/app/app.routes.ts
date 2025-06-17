import { Routes } from '@angular/router';
import { EnfermedadComponent } from './components/enfermedad/enfermedad';
import { Insertareditar } from './components/enfermedad/insertareditar/insertareditar';

export const routes: Routes = [
    { path:'enfermedad',component:EnfermedadComponent,
        children:[
            {path:'nuevo',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ]
     }
];
