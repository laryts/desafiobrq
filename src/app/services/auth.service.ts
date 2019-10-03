import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post<User>(`${environment.apiURL}/users/authenticate`, {username, password})
    .pipe(map(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.next(user);
      }
      return user;
    }));
  }

  logout(){
    localStorage.removeItem('user');
    this.user.next(null);
  }

  check(user: User){
    this.user.next(user);
  }
}
