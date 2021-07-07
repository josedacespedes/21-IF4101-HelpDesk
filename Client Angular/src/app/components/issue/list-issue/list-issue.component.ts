import { Component, OnInit } from '@angular/core';
import {Issue} from "../../../../models/Issue";
import {IssueService} from "../../../../services/issue.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {User} from "../../../../models/User";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.css']
})
export class ListIssueComponent implements OnInit {
  public issueList: Observable<Issue[]>;
  servicesData = [
    {id: 1, name: 'Telefonía Móvil'},
    {id: 2, name: 'Cable'},
    {id: 3, name: 'Internet'},
    {id: 4, name: 'Telefonía Fija'}
  ];

  constructor(private issueService: IssueService,
              private auth: AuthenticationService,
              private router: Router) {
    if(!this.auth.isUserLoggedIn()) this.router.navigate(['login']);
  }

  ngOnInit() {
    this.getIssues();
  }

  getIssues() {
    //TODO set auth._userId
    this.issueList = this.issueService.findAllByUserId(this.auth._userId);
  }
}
