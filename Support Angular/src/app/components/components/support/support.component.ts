import { Component, OnInit } from '@angular/core';
import { FormArray, NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Support } from '../models/Support';
import { SupportService } from '../services/Support.service';
import swal from "sweetalert2";
import {AuthenticationService} from '../services/authentication.service';
import { Regex } from '../../../regex/regex.validation';


//JALAR EL SERVICIO

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error = '';
  loading: boolean = false;
  regex: Regex = new Regex();

  servicesData = [
    {id: 1, name: 'Telefonía Móvil'},
    {id: 2, name: 'Cable'},
    {id: 3, name: 'Internet'},
    {id: 4, name: 'Telefonía Fija'}
  ];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private supportService: SupportService, private authenticationService: AuthenticationService) {
    if (!this.authenticationService.isUserLoggedIn()) 
    { this.router.navigate(['login']); }
  this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(320)]],
    pass: ['', [Validators.required, Validators.pattern(this.regex.password),Validators.minLength(8),Validators.maxLength(8)]],
    name: ['', [Validators.required, Validators.pattern(this.regex.name), Validators.minLength(3), Validators.maxLength(50)]],
    First_L: ['', [Validators.required, Validators.pattern(this.regex.surname), Validators.minLength(4), Validators.maxLength(50)]],
    Second_L: ['', [Validators.required, Validators.pattern(this.regex.surname), Validators.minLength(4), Validators.maxLength(50)]],
    services: new FormArray([])
  });
}



  ngOnInit(): void {
    this.addCheckbox();
  }


  submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) {return;}
    
    this.blockForm();
    const user = new Support();
    user.Email = this.email.value;
    user.Pass = this.pass.value;
    user.Name = this.name.value;
    user.First_SurName = this.First_L.value;
    user.Second_Surname = this.Second_L.value;
    user.Id_Supervisor = this.authenticationService.userId;
    user.servicesById = this.selectedServices;
      this.supportService.createSupport(user).subscribe(data => {
        swal.fire({
          icon: 'success',
          text: 'El registro fue éxitoso'
        }).finally(() => {
          this.router.navigate(['/Issue']);
        });
      }, res => {
        this.error = "El correo ya existe";
        this.unBlockForm();
      });
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
  get First_L() { return this.form.get('First_L'); }
  get Second_L() { return this.form.get('Second_L'); }
  get radioButton() { return this.form.get('radioButton'); }
  get selectedServices() {
    const selectedServiceIds = this.form.value.services
    .map((v, i) => (v ? this.servicesData[i].id : null))
    .filter(v => v !== null);
    return selectedServiceIds;
  }
}
