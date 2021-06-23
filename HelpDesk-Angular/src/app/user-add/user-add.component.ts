import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAddService } from '../services/user-add.service';
import Swal from 'sweetalert2';
import { Client } from '../models/client.model';
import { Regex } from '../regex/regex.validation';
import { requireCheckboxesToBeCheckedValidator } from '../regex/checkbox.validation';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  ngOnInit() {
  }

  addUserForm: FormGroup;
  client: Client = new Client();
  regex: Regex = new Regex();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private loginService: UserAddService, private router: Router) {
    this.addUserForm = this.fb.group({
      id: 0,
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex.name),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex.surname),
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regex.password),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      control:new FormControl('',
        Validators.required
      ),
      servicesCheckboxGroup: new FormGroup({
        mobilePhone: new FormControl(false),
        channel: new FormControl(false),
        internet: new FormControl(false),
        fixedTelephony: new FormControl(false),
      }, requireCheckboxesToBeCheckedValidator())
    })
  }

  register() {
    if (!this.addUserForm.valid) {
      return;
    }

    Swal.fire({ title: "Registro Exitoso", timer: 1500 });
    
    
    
  }

  clear() {
    this.addUserForm.reset();
  }



}
