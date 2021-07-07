import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appAngularClient';

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
    //if(this.auth.isUserLoggedIn())
      //this.router.navigate(["/login"]);
  }
}
