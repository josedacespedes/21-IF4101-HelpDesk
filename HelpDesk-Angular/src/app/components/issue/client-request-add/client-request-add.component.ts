import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../services/issue.service';
import Swal from 'sweetalert2';
import { Client } from '../../../models/client.model';
import { Regex } from '../../../regex/regex.validation';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-client-request-add',
  templateUrl: './client-request-add.component.html',
  styleUrls: ['./client-request-add.component.css']
})
export class ClientRequestAddComponent implements OnInit {

  ngOnInit() {
  }

  addUserRequestForm: FormGroup;
  client: Client = new Client();
  regex: Regex = new Regex();
  today= new Date();
  jstoday = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private issueService: IssueService, private router: Router) {
    
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', 'GMT-6');

    this.addUserRequestForm = this.fb.group({
      id: 0,
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]),
      phone: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(this.regex.number)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
      address: new FormControl('', [
        Validators.minLength(20),
        Validators.maxLength(255)
      ]),
      control: ['2']
    })
  }

  addRequestClient() {
    if (!this.addUserRequestForm.valid) {
      return;
    }
    

    Swal.fire({ title: "Solicitud enviada", timer: 1500 });
    this.clear();

    this.issueService.createIssue(this.addUserRequestForm.value).subscribe((result) => {
      if (result != null) {
        Swal.fire({
          icon: 'success',
          title: 'Enviado exitoso!',
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Problema con el envio',
          timer: 1500
        })
      }
    });
    
    
  }

  clear() {
    this.addUserRequestForm.reset();
  }


}
