import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required], 
      username: ['', Validators.required], 
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log("Clique")
  }

}
