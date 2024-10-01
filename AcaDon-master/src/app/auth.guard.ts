import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

type Role = 'ADMIN' | 'ALUNO';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private rolePermissions: Record<Role, boolean | { [key: string]: boolean }> =
    {
      ADMIN: true,
      ALUNO: { home: true },
    };

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUsuario().pipe(
      map((usuario) => {
        if (!usuario) {
          console.log('Usuário não autenticado, redirecionando para login.');
          this.router.navigate(['/login']);
          return false;
        }

        const { papel } = usuario as { papel: Role };
        const routePath = route.routeConfig?.path;

        const permissions = this.rolePermissions[papel];

        if (permissions === true) {
          console.log('ADMIN pode acessar tudo.');
          return true;
        } else if (
          typeof permissions === 'object' &&
          routePath &&
          permissions[routePath]
        ) {
          console.log(`ALUNO acessando rota: ${routePath}.`);
          return true;
        }

        console.log(
          `Acesso negado para: ${routePath}, redirecionando para home.`
        );
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
