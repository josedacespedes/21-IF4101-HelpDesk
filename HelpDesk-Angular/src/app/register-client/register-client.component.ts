import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Client } from '../models/client.model';
import { Regex } from '../regex/regex.validation';
import { requireCheckboxesToBeCheckedValidator } from '../regex/checkbox.validation';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
  registerForm: FormGroup;
  client: Client = new Client();
  regex: Regex = new Regex();

  ngOnInit() {
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private loginService: LoginService, private router: Router) {
    this.registerForm = this.fb.group({
      id: 0,
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.regex.name)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.regex.surname)
      ]),
      secondName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.regex.surname)
      ]),
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
      adress: new FormControl('', [
        Validators.minLength(20),
        Validators.maxLength(255)
      ]),
      phone: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(this.regex.number)
      ]),
      secondContact: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(this.regex.number)
      ]),
      servcicesCheckboxGroup: new FormGroup({
        mobilePhone: new FormControl(false),
        channel: new FormControl(false),
        internet: new FormControl(false),
        fixedTelephony: new FormControl(false),
      }, requireCheckboxesToBeCheckedValidator())
    })
  }



  register() {
    if (!this.registerForm.valid) {
      return;
    }

    Swal.fire({ title: "Registrado", timer: 1000 });
    this.router.navigateByUrl("/login");

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
