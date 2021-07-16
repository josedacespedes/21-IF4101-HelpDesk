import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import swal from'sweetalert2';
import { Regex } from '../../../regex/regex.validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error: string;
  loading: boolean = false;
  regex: Regex = new Regex();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(320)]],
      pass: ['', [Validators.required,Validators.pattern(this.regex.password),Validators.minLength(8),Validators.maxLength(8)]]
    });
  }

  submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) return;
    this.blockForm();
    this.authenticationService.logout();
    this.authenticationService.authentication(this.email.value, this.pass.value)
    .pipe(first())
    .subscribe(
      data => {
        swal.fire({
          icon: 'success',
          text: 'Se ha iniciado sesión correctamente'
        }).finally(() => {
          this.router.navigate(['main/support']);
        });
      },
      res => {
        this.error = res.error;
        this.unBlockForm();
      });
}

  blockForm() {
    this.loading = true;
    this.form.disable();
  }

  unBlockForm() {
    this.loading = false;
    this.form.enable();
  }

  get email() { return this.form.controls.email; }
  get pass() { return this.form.controls.pass; }

}
