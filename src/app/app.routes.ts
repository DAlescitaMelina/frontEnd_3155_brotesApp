import { Routes } from '@angular/router';
import { ZonaComponent } from './components/zona/zona';
import { RolComponent } from './components/rol/rol';
import { InsertareditarComponentZona } from './components/zona/insertareditar/insertareditar';
import { InsertareditarComponentRol } from './components/rol/insertareditar/insertareditar';
import { ContagioComponent } from './components/contagio/contagio';
import { TipoTransmisionComponent } from './components/tipo-transmision/tipo-transmision';
import { InsertareditarComponentTipoTransmision } from './components/tipo-transmision/insertareditar/insertareditar';
import { InsertareditarComponentContagio } from './components/contagio/insertareditar/insertareditar';
import { EnfermedadComponent } from './components/enfermedad/enfermedad';
import { Insertareditar } from './components/enfermedad/insertareditar/insertareditar';
import { EnfermedadSintomasEComponent } from './components/enfermedad-sintomas-e/enfermedad-sintomas-e';
import { VerpantallaLogin } from './components/pantalla-login/verpantalla-login/verpantalla-login';
import { PantallaLoginComponent } from './components/pantalla-login/pantalla-login';
import { PantallaEntidadesComponent } from './components/pantalla-entidades/pantalla-entidades';
import { VerpantallaEntidades } from './components/pantalla-entidades/verpantalla-entidades/verpantalla-entidades';
import { UsuarioComponent } from './components/usuario/usuario';
import { InsertareditarComponentUsuario } from './components/usuario/insertareditar/insertareditar';
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
        path:'pantalla-login',component:PantallaLoginComponent,
          children:[
        {
            path:'verpantalla-login',component:VerpantallaLogin
        },
       
        ]
    },
    
    {
        path:'pantalla-entidades',component:PantallaEntidadesComponent,
          children:[
        {
            path:'verpantalla-entidades',component:VerpantallaEntidades
        },
       
        ]
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
    //enfermedad
   { path:'enfermedades',component:EnfermedadComponent,
        children:[
            {path:'nuevo',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ]
     },
     //enfermedadSintoma
     { path:'EnfermedadSintomasE',component:EnfermedadSintomasEComponent,
        children:[
            {path:'nuevoESE',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ]
     },
       //usuario
     { path:'usuarios',component:UsuarioComponent,
        children:[
            {path:'nuevo',component:InsertareditarComponentUsuario},
            {path:'ediciones/:id', component:InsertareditarComponentUsuario}
        ]
     },

];
