import { Routes } from '@angular/router';
import { Contagio } from './components/contagio/contagio';
import { TipoTransmision } from './components/tipo-transmision/tipo-transmision';
import { InsertareditarContagios } from './components/contagio/insertareditarContagios/insertareditarContagios';
import { insertareditarTipoTransmision } from './components/tipoTransmision/insertareditarTipoTransmision/insertareditarTipoTransmision';


export const routes: Routes = [
    {
        path:`contagios`, component:Contagio,
        children:[
            {
                path: `nuevo`, component:InsertareditarContagios
            },
            {
                path:'ediciones/:id', component:InsertareditarContagios
            }
    ]
    },
    
    {
        path:`tipoTransmision`, component:TipoTransmision,
        children:[
            {
                path: `nuevo`, component:insertareditarTipoTransmision
            },
            {
                path: 'ediciones/:id', component:insertareditarTipoTransmision
            }
    ]
    }
]; 
