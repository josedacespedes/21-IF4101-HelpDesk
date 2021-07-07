import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/User";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../../../services/authentication.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error = '';
  loading: boolean = false;

  servicesData = [
    {id: 1, name: 'Telefonía Móvil'},
    {id: 2, name: 'Cable'},
    {id: 3, name: 'Internet'},
    {id: 4, name: 'Telefonía Fija'}
  ];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
      firstSurname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
      secondSurname: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('([0-9]){8}')]],
      secondContact:  ['', [Validators.required, Validators.pattern('([0-9]){8}')]],
      services: new FormArray([])
    });
  }

  ngOnInit() {
    this.addCheckbox();
  }

  addCheckbox() {
    this.servicesData.forEach((o, i) => {
      const control = new FormControl();
      (this.form.controls.services as FormArray).push(control);
    });
  }

  isSelectedCheckboxes() {
    if(this.selectedServices.length > 0 ) return true;
    else return false;
  }

  submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) return;
    this.blockForm();
    let user = new User();
    user.email = this.email.value;
    user.pass = this.pass.value;
    user.name = this.name.value;
    user.firstSurname = this.firstSurname.value;
    user.secondSurname = this.secondSurname.value;
    user.address = this.address.value;
    user.phone = this.phone.value;
    user.secondContact = this.secondContact.value;
    user.servicesById = this.selectedServices;
    this.userService.createUser(user).subscribe(data => {
      swal.fire({
        icon: 'success',
        text: 'El registro fue éxitoso'
      }).finally(() => {
        this.router.navigate(['/login'])
      });
    }, res => {
      this.error = res.error.text;
      this.unBlockForm();
    })
  }

  blockForm() {
    this.loading = true;
    this.form.disable();
  }

  unBlockForm() {
    this.loading = false;
    this.form.enable();
  }

  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }
  get name() { return this.form.get('name'); }
  get firstSurname() { return this.form.get('firstSurname'); }
  get secondSurname() { return this.form.get('secondSurname'); }
  get address() { return this.form.get('address'); }
  get phone() { return this.form.get('phone'); }
  get secondContact() { return this.form.get('secondContact'); }
  get selectedServices() {
    const selectedServiceIds = this.form.value.services
    .map((v, i) => (v ? this.servicesData[i].id : null))
    .filter(v => v !== null);
    return selectedServiceIds;
  }

}
