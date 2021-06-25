import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAssignSupportService } from '../services/user-assign-support';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { Regex } from '../regex/regex.validation';
import { requireCheckboxesToBeCheckedValidator } from '../regex/checkbox.validation';

@Component({
  selector: 'app-user-assign-support',
  templateUrl: './user-assign-support.component.html',
  styleUrls: ['./user-assign-support.component.css']
})

export class UserAssignSupportComponent implements OnInit {

  ngOnInit() {
  }

  assignSupportForm: FormGroup;
  user: User = new User();
  regex: Regex = new Regex();

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private loginService: UserAssignSupportService, private router: Router) {
    this.assignSupportForm = this.fb.group({
      id: 0,
      control:new FormControl('',
        Validators.required
      ),
    })
  }


  register() {

    // if (!this.assignSupportForm.valid) {
    //   return;
    // }

    Swal.fire({ title: "Asignado Exitoso", timer: 1500 });
    this.clear();
  }

  clear() {
    this.assignSupportForm.reset();
  }
}