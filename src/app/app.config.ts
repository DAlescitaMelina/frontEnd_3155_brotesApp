import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, 
  provideBrowserGlobalErrorListeners, 
  provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { JwtModule } from '@auth0/angular-jwt';

// Función que obtiene el token desde sessionStorage para el JwtModule
export function tokenGetter() {
  if (typeof window === 'undefined') {
    return null;
  }
  const token = window.sessionStorage.getItem('token');
  return token && token.split('.').length === 3 ? token : null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // Interceptores
    provideCharts(withDefaultRegisterables()),

    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8081'],   // Aquí tu dominio backend
          disallowedRoutes: [
            'http://localhost:8081/login',         // Evita enviar token al login
            'http://localhost:8081/login/forget'   // Evita enviar token a recuperar contraseña
          ],
        },
      })
    )
  ]
};
