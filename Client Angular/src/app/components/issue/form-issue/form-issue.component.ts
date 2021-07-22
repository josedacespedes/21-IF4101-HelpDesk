// import { Component, OnInit } from '@angular/core';
// import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {Router} from "@angular/router";
// import {Issue} from "../../../../models/Issue";
// import {Service} from "../../../../models/Service";
// import {Observable} from "rxjs";
// import {IssueService} from "../../../../services/issue.service";
// import {User} from "../../../../models/User";
// import {AuthenticationService} from "../../../../services/authentication.service";
// import swal from'sweetalert2';
// import { Regex } from '../../../regex/regex.validation';

// @Component({
//   selector: 'app-form-issue',
//   templateUrl: './form-issue.component.html',
//   styleUrls: ['./form-issue.component.css']
// })
// export class FormIssueComponent implements OnInit {
//   form: FormGroup;
//   submitted = false;
//   error = '';
//   loading: boolean = false;
//   servicesData = new Array<Service>();
//   regex: Regex = new Regex();

//   constructor(private formBuilder: FormBuilder,
//               private router: Router,
//               private issueService: IssueService,
//               private auth: AuthenticationService) {
//     if(!this.auth.isUserLoggedIn()) this.router.navigate(['login']);
//   }

//   ngOnInit() {
//     this.form = this.formBuilder.group({
//       description: ['', [Validators.required], Validators.minLength(5), Validators.maxLength(255)],
//       phone: ['', [Validators.required, Validators.pattern(this.regex.number), Validators.minLength(8), Validators.maxLength(8)]],
//       email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(320)]],
//       address: ['', [Validators.required], Validators.minLength(20), Validators.maxLength(255)],
//       service: ['', [Validators.required]],
//       services: new FormArray([], [Validators.required])
//     });
//     this.addSelectBox();
//   }

//   addSelectBox() {
//     if(this.auth.isUserLoggedIn())
//       this.auth._services.forEach((o, i) => {
//         let service = new Service(o);
//         this.servicesData.push(service);
//       });
//     //TODO delete line
//     //this.servicesData.push(new Service(1));

//     this.servicesData.forEach((o, i) => {
//       const control = new FormControl();
//       (this.form.controls.services as FormArray).push(control);
//     })
//   }

//   submit() {
//     this.error = '';
//     this.submitted = true;
//     if (this.form.invalid || this.loading) return;
//     let issue = new Issue();
//     issue.description = this.description.value;
//     issue.contactPhone = this.phone.value;
//     issue.contactEmail = this.email.value;
//     issue.address = this.address.value;
//     issue.serviceById = this.services.value;
//     //TODO set auth._userId
//     issue.userById = this.auth._userId;
//     this.blockForm();
//     this.issueService.createIssue(issue).subscribe(data => {
//       swal.fire({
//         icon: 'success',
//         text: 'Se ha enviado la solicitud'
//       }).finally(() => {
//         this.router.navigate(['issue/list'])
//       });
//     }, res => {
//       this.unBlockForm();
//       this.error = res.error.text;
//     })
//   }

//   blockForm() {
//     this.loading = true;
//     this.form.disable();
//   }

//   unBlockForm() {
//     this.loading = false;
//     this.form.enable();
//   }

//   get description() { return this.form.get('description'); }
//   get phone() { return this.form.get('phone'); }
//   get email() { return this.form.get('email'); }
//   get address() { return this.form.get('address'); }
//   get services() { return this.form.get('service'); }

// }



import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Issue} from "../../../../models/Issue";
import {Service} from "../../../../models/Service";
import {Observable} from "rxjs";
import {IssueService} from "../../../../services/issue.service";
import {User} from "../../../../models/User";
import {AuthenticationService} from "../../../../services/authentication.service";
import swal from'sweetalert2';

@Component({
  selector: 'app-form-issue',
  templateUrl: './form-issue.component.html',
  styleUrls: ['./form-issue.component.css']
})
export class FormIssueComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error = '';
  loading: boolean = false;
  servicesData = new Array<Service>();

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private issueService: IssueService,
              private auth: AuthenticationService) {
    if(!this.auth.isUserLoggedIn()) this.router.navigate(['login']);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('([0-9]){8}')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      service: ['', [Validators.required]],
      services: new FormArray([], [Validators.required])
    });
    this.addSelectBox();
  }

  addSelectBox() {
    if(this.auth.isUserLoggedIn())
      this.auth._services.forEach((o, i) => {
        let service = new Service(o);
        this.servicesData.push(service);
      });
    //TODO delete line
    //this.servicesData.push(new Service(1));

    this.servicesData.forEach((o, i) => {
      const control = new FormControl();
      (this.form.controls.services as FormArray).push(control);
    })
  }

  submit() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) return;
    let issue = new Issue();
    issue.description = this.description.value;
    issue.contactPhone = this.phone.value;
    issue.contactEmail = this.email.value;
    issue.address = this.address.value;
    issue.serviceById = this.services.value;
    //TODO set auth._userId
    issue.userById = this.auth._userId;
    this.blockForm();
    this.issueService.createIssue(issue).subscribe(data => {
      swal.fire({
        icon: 'success',
        text: 'Se ha enviado la solicitud'
      }).finally(() => {
        this.router.navigate(['issue/list'])
      });
    }, res => {
      this.unBlockForm();
      this.error = res.error.text;
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

  get description() { return this.form.get('description'); }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }
  get address() { return this.form.get('address'); }
  get services() { return this.form.get('service'); }

}
