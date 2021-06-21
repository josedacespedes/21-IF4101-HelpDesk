import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
  }

  loginForm: FormGroup;
  client: Client = new Client();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      id: 0,
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
    })
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    Swal.fire({ title: "Correcto", timer: 1000 });

    // this.loginService.login(this.loginForm.value).subscribe((result) => {
    //   if (result) {
    //     this.client = result;
    //     this.modal('/home', 'Bienvenido:'+ this.client.name );
    //   } else {
    //     this.modal('/login', 'Credentials incorrect')
    //   }
    // });
  }

  // modal(url: string | '', message: String) {
  //   let timerInterval: any
  //   Swal.fire({
  //     title: message,
  //     html: '',
  //     timer: 1000,
  //     didOpen: () => {
  //       Swal.showLoading()
  //       timerInterval = setInterval(() => {
  //       }, 50)
  //     },
  //     willClose: () => {
  //       clearInterval(timerInterval)
  //     }
  //   }).then((result) => {
  //     if (result.dismiss === Swal.DismissReason.timer) {
  //       this.router.navigateByUrl(url);
  //     }
  //   })
  // }

}
