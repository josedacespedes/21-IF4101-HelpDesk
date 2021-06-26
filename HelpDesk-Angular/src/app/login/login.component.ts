import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Client } from '../models/client.model';
import { Regex } from '../regex/regex.validation';


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
  regex: Regex = new Regex();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex.password),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
    })
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.loading();

    this.loginService.authentication(this.loginForm.value).subscribe((result) => {
      if (result != null) {
        this.modal('/main-client', 'Bienvenido al sistema');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Datos incorrectos'
        })
      }
    });
  }

  modal(url: string | '', message: String) {
    let timerInterval: any
    Swal.fire({
      title: message,
      html: 'Usted será redireccionado en <b></b> milisegundos.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft() + ""
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigateByUrl(url);
      }
    })
  }

  loading() {
    let timerInterval: any
    Swal.fire({
      title: 'Autenticando...',
      timer: 100000,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  }
}
