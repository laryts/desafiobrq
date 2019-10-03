import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;

  constructor(private router: Router, private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user){
      this.authService.check(this.user);
      return true
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
