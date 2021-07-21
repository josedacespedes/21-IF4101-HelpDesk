import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Support } from '../../models/Support';
import { Supervisor } from '../../models/Supervisor';
import { IssueClient } from '../../models/IssueClient';
import { User } from '../../models/User';
import { Comment } from '../../models/Comment';
import { Note } from '../../models/Note';
import { IssueService } from '../../services/Issue.service';
import { SupportService } from '../../services/Support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    idSess: number;
    id: number;
    issue: Issue;
    issueClient: IssueClient;
    user: User;
    comment: Comment;
    note: Note;
    comments: Observable<Comment[]>;
    notes: Observable<Note[]>;
    supports: Observable<Support[]>;
    author: String;
    session: Session;

    loadingUpdateStatus: boolean;
    errorUpdateStatus: null;

    loadingSetSupporter: boolean;
    validSelectSupport = false;
    errorSelectSupport = null;

    loadingUpdateClassification: boolean;
    loadingSetClassification: boolean;
    validSelectClassification = false;
    errorSelectClassification = null;

    loadingResolveIssue: boolean;
    validResolveIssue = false;
    errorResolveIssue = null;

    loadingAddComment: boolean;
    validAddComment = false;
    errorAddComment = null;

    loadingAddNote: boolean;
    validAddNote = false;
    errorAddNote = null;

    constructor(private route: ActivatedRoute, private router: Router,
                private issueService: IssueService, private suppService: SupportService, private authenticationService: AuthenticationService) {
      if (!this.authenticationService.isUserLoggedIn()) { this.router.navigate(['login']); 
    }
    }

    ngOnInit() {
        this.issue = new Issue();
        
        this.issueClient = new IssueClient();
        this.user = new User();
        this.comment = new Comment();
        this.note = new Note();
        this.id = this.route.snapshot.params.id;

        this.issueService.getIssueClient(this.id).subscribe(data => {
            this.issueClient = data;
            this.issueService.getUserClient(this.issueClient.userById)
                // tslint:disable-next-line:no-shadowed-variable
                .subscribe(data => {
                    this.user = data;
                }, error => console.log());
        }, error => console.log());

        this.issueService.getIssue(this.id)
            .subscribe(data => {
                this.issue = data;
            }, error => console.log());
        this.reloadData();
    }

    reloadData() {
      this.supports = this.suppService.getSupportList();
      this.comments = this.issueService.getCommentList(this.id);
      this.notes = this.issueService.getNote(this.id);
    }

    list() {
      this.router.navigate(['Issue']);
    }

    
    updateStatus(status: string) {
        this.loadingUpdateStatus = true;
        this.issueService.updateStatusIssue(this.id, status).subscribe(data => {
            swal.fire({
                icon: 'success',
                text: 'Se ha actualizado el estado'
            }).finally(() => {
                this.list();
                this.loadingSetSupporter = false;
            });
        }, res => {
            this.errorUpdateStatus = res.error.text;
            this.loadingUpdateStatus = false;
        });
    }

    updateClassification(classification: string) {
      this.loadingUpdateClassification = true;
      this.issueService.updateClassificationIssue(this.id, classification).subscribe(data => {
          swal.fire({
              icon: 'success',
              text: 'Se ha actualizado la clasificación'
          }).finally(() => {
              this.list();
              this.loadingUpdateClassification = false;
          });
      }, res => {
          this.errorSelectClassification = res.error.text;
          this.loadingUpdateClassification = false;
      });
    }

    addComment() {
        this.comment.description = (document.querySelector('#comment') as HTMLTextAreaElement).value;
        this.comment.issueByReportNumber = this.issue.Report_Number;
        if(this.authenticationService.getUserLoggedRole() == 'USU'){
          this.comment.author = 'Supervisor';
          alert(this.note.Author);
        }else {
          this.comment.author = 'Soportista';
          alert(this.note.Author);
        }
        if (this.comment.description === '') { this.validAddComment = true; } else {
          this.loadingAddComment = true;
          this.issueService.createCommet(this.comment).subscribe(() => {
            swal.fire({
              icon: 'success',
              text: 'Se ha agregado el comentario'
            }).finally(() => {
              this.list();
            });
          }, res => {
            this.errorAddComment = res.error.text;
            this.loadingAddComment = false;
          });
        }
    }

    addNote() {
        
        this.note.Report_Number = this.issue.Report_Number;
        this.note.Description = (document.querySelector('#note') as HTMLTextAreaElement).value;

        if(this.authenticationService.getUserLoggedRole() == 'USU'){
          this.note.Author = 'Supervisor';
          alert(this.note.Author);
        }else {
          this.note.Author = 'Soporte';
          alert(this.note.Author);
        }
        
        if (this.note.Description === '') { this.validAddNote = true; } else {
          this.loadingAddNote = true;
          this.issueService.createNote(this.note).subscribe(() => {
            swal.fire({
              icon: 'success',
              text: 'Se ha agregado la nota'
            }).finally(() => {
              this.list();
              this.loadingSetSupporter = false;
            });
          }, res => {
            this.errorAddNote = res.error.text;
            this.loadingAddNote = false;
          });
        }
    }

    setSupportUser() {
      const idSupportUser = (document.querySelector('#support') as HTMLSelectElement).value;
      if (idSupportUser === '') { this.validSelectSupport = true; } else {
        this.loadingSetSupporter = true;
        this.validSelectSupport = false;
        this.issueService.updateStatusIssue(this.id, 'Asignado').subscribe(
          data => {
            this.issueService.setSupportUser(this.id, idSupportUser).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              data => {
                swal.fire({
                  icon: 'success',
                  text: 'Se ha seleccionado un soportista para la solicitud'
                }).finally(() => {
                  // window.location.reload();
                  this.loadingSetSupporter = false;
                  this.list();
                });
              }, res => {
                this.loadingSetSupporter = false;
                this.errorSelectSupport = res.error.text;
              });
          }, res => {
            this.loadingSetSupporter = false;
            this.errorSelectSupport = res.error.text;
          });
      }
    }

    setClassificationUser() {
      const classificationUser = (document.querySelector('#classification') as HTMLSelectElement).value;
      if (classificationUser === '') { this.validSelectClassification = true; } else {
        this.loadingSetClassification = true;
        this.validSelectClassification = false;
        this.issueService.updateClassificationIssue(this.id, '').subscribe(
        data => {
          swal.fire({
            icon: 'success',
            text: 'Se ha seleccionado una clasificación para la solicitud'
          }).finally(() => {
            // window.location.reload();
            this.loadingSetSupporter = false;
            this.list();
          });
        },  res => {
        this.loadingSetSupporter = false;
        this.errorSelectSupport = res.error.text;
      });
      }
    }


    resolveIssue() {
        this.comment.description = 'Comentario de resolución: ' + (document.querySelector('#resolComment') as HTMLTextAreaElement).value;
        if (this.comment.description === '') { this.validResolveIssue = true; } else {
          this.validResolveIssue = false;
          this.loadingResolveIssue = true;
          this.comment.issueByReportNumber = this.issue.Report_Number;
          this.issue.Resolution_Comment = (document.querySelector('#resolComment') as HTMLTextAreaElement).value;
          this.issueService.resolveIssue(this.issue).subscribe(() => 'Succces', error => 'Error');
          this.issueService.createCommet(this.comment).subscribe(() => 'Succces', error => 'Error');
          this.issueService.updateStatusIssue(this.issue.Report_Number, 'Resuelto').subscribe(data => {
            swal.fire({
              icon: 'success',
              text: 'Se ha resuelto el caso '
            }).finally(() => {
              this.list();
              this.loadingSetSupporter = false;
            });
          }, res => {
            this.errorResolveIssue = res.error.text;
            this.loadingResolveIssue = false;
          });
        }
    }

    
}

interface Session {
  IdUser: number;
  Role: string;
  Token: string;
}