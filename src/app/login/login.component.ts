import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: any;
  loading:boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(4)]]
    })

    this.authService.logout();
  }

  login(){
    if (this.loginForm.invalid) {
      this.error = 'Por favor, preencha os dados';
      return;
    }
    this.loading = true;
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
      .pipe(first())
      .subscribe(
        user => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

}
