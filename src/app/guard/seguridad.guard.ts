import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const lService=inject(LoginService)
    const router=inject(Router)
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
      //Verificacion de roles     
      const expectedRoles: string[] = route.data['roles']; // <-- roles permitidos en la ruta
       const userRole = lService.showRole(); // <-- rol actual
    if (expectedRoles && !expectedRoles.includes(userRole)) {
        router.navigate(['/unauthorized']); 
        return false;
    }
        return rpta;//tiene acceso

};