import { Routes } from '@angular/router';
import { EnfermedadComponent } from './components/enfermedad/enfermedad';
import { Insertareditar } from './components/enfermedad/insertareditar/insertareditar';
import { EnfermedadSintomasEComponent } from './components/enfermedad-sintomas-e/enfermedad-sintomas-e';

export const routes: Routes = [
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
