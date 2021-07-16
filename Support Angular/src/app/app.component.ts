import { Component } from '@angular/core';
import { AuthenticationService } from '../../src/app/components/components/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  title = 'appAngularSupport';

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}