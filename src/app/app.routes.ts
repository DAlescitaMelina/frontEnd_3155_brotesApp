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
import { UsuarioComponent } from './components/usuario/usuario';
import { InsertareditarComponentUsuario } from './components/usuario/insertareditar/insertareditar';

import { VerpantallaComponent } from './components/pantalla-inicio/verpantalla/verpantalla';

import { InsertareditarBrotesComponent } from './components/brotes/insertareditar-brotes/insertareditar-brotes.component';
import { InsertareditartipoEnfermedadComponent } from './components/tipo-enfermedad/insertareditar/insertareditar.component';
import { InsertareditarNotificacionComponent } from './components/notificacion/insertareditar-notificacion/insertareditar-notificacion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BrotesComponent } from './components/brotes/brotes.component';
import { TipoEnfermedadService } from './services/tipoEnfermedad.service';
import { ReportesComponent } from './components/reportes/reportes';
import { Q1bdto } from './components/reportes/q1bdto/q1bdto';
import { Q2bdto } from './components/reportes/q2bdto/q2bdto';
import { QD2Component } from './components/reportes/q-d2/q-d2';
import { QD1 } from './components/reportes/q-d1/q-d1';
import { Qt1Component } from './components/reportes/qt1/qt1';
import { Login } from './components/login/login';
import { seguridadGuard } from './guard/seguridad.guard';
import { Home } from './components/home/home';
import { Qw1Component } from './components/reportes/qw1/qw1';
import { TipoEnfermedadComponent } from './components/tipo-enfermedad/tipo-enfermedad.component';
import { sintomasEnfermedad } from './models/sintomasEnfermedad';
import { InsertareditarComponentSintomasEnfermedad } from './components/sintomas-enfermedad/insertareditar/insertareditar';
import { SintomasEnfermedad } from './components/sintomas-enfermedad/sintomas-enfermedad';
import { PrevencionComponent } from './components/prevenciones/prevencion.component';
import { InsertareditarPrevencionComponent } from './components/prevenciones/insertareditar-prevencion/insertareditar-prevencion.component';



export const routes: Routes = [
    {
        path:'',redirectTo: 'verinicio',pathMatch:'full' 

    },
    {
        path:'verinicio',component:VerpantallaComponent
    },    
    {
        path: 'login',
        component: Login,
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
        ],
            canActivate: [seguridadGuard],
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
            canActivate: [seguridadGuard],
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
        ],
            canActivate: [seguridadGuard],
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
        ],
            canActivate: [seguridadGuard],
    },
    //enfermedad
   { path:'enfermedades',component:EnfermedadComponent,
        children:[
            {path:'inserta',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ],
            canActivate: [seguridadGuard],
     },
     //enfermedadSintoma
     { path:'EnfermedadSintomasE',component:EnfermedadSintomasEComponent,
        children:[
            {path:'nuevoESE',component:Insertareditar},
            {path:'ediciones/:id', component:Insertareditar}
        ],
            canActivate: [seguridadGuard],
     },

          //SintomasEnfermedad
     { path:'sintomasE',component:SintomasEnfermedad,
        children:[
            {path:'nuevo',component:InsertareditarComponentSintomasEnfermedad},
            {path:'ediciones/:id', component:InsertareditarComponentSintomasEnfermedad}
        ],
            canActivate: [seguridadGuard],
     },

       //usuario
     { path:'usuarios',component:UsuarioComponent,
        children:[
            {path:'nuevo',component:InsertareditarComponentUsuario},
            {path:'ediciones/:id', component:InsertareditarComponentUsuario}
        ],
            canActivate: [seguridadGuard],
     },

     //brotes
     { path:'brotes',component:BrotesComponent,
        children:[
            {path:'nuevo',component:InsertareditarBrotesComponent},
            {path:'ediciones/:id', component:InsertareditarBrotesComponent}

        ]
     },
      
     //tiposEnfermedad
     { path:'tiposE',component: TipoEnfermedadComponent,
        children:[
            {path:'nuevo',component:InsertareditartipoEnfermedadComponent},
            {path:'ediciones/:id', component:InsertareditartipoEnfermedadComponent}
        ],
            canActivate: [seguridadGuard],
     },

    //notificaciones
     { path:'notificaciones',component:NotificacionComponent,
        children:[
            {path:'nuevo',component:InsertareditarNotificacionComponent},
            {path:'ediciones/:id', component:InsertareditarNotificacionComponent}
        ],
          canActivate: [seguridadGuard],
     },

    //prevenciones
    { path:'prevenciones',component:PrevencionComponent,
        children:[
          {path:'nuevo',component:InsertareditarPrevencionComponent},
            {path:'ediciones/:id', component:InsertareditarPrevencionComponent}
        ],
            canActivate: [seguridadGuard],
    },

    //reportes
    {
        path:'reportes',component:ReportesComponent,
         canActivate: [seguridadGuard],
    },
  
    {
        path: 'homes',
        component: Home,
            canActivate: [seguridadGuard],
              
    },
];
