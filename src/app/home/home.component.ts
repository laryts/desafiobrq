import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
