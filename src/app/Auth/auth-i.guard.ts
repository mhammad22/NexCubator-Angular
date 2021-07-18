import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthIGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem('TokenInfo') != null &&
      !localStorage.getItem('userrole').localeCompare('Investor')
    ) {
      console.log('True');
      return true;
    } else {
      this.router.navigate(['/login-form']);
      console.log('false');
      return false;
    }
  }
}
