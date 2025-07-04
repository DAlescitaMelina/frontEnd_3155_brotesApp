import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
<<<<<<< Updated upstream
import { provideHttpClient, withFetch } from '@angular/common/http';
<<<<<<< Updated upstream

=======
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
>>>>>>> Stashed changes
=======
import { provideHttpClient, withFetch,withInterceptorsFromDi } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  // Si no hay window, devolvemos null (no hay token)
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.sessionStorage.getItem('token');
  // Solo devolvemos algo si es un JWT válido de 3 partes
  return token && token.split('.').length === 3 ? token : null;
}
>>>>>>> Stashed changes

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
<<<<<<< Updated upstream

=======
    provideBrowserGlobalErrorListeners(),
>>>>>>> Stashed changes
    provideRouter(routes),


    provideClientHydration(withEventReplay()),
    provideCharts(withDefaultRegisterables()),
    //provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withFetch(),withInterceptorsFromDi()),
     importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8081'],
          disallowedRoutes: ['http://localhost:8081/login/forget'],
        },
      })
    )
  ]
};
 