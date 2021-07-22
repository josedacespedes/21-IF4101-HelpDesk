import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {CommentService} from "../../../../services/comment.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IssueService} from "../../../../services/issue.service";
import {Issue} from "../../../../models/Issue";
import {Comment} from "../../../../models/Comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from "sweetalert2";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  error = '';
  reportNumber: number;
  public issue: Issue;
  public commentList: Observable<Comment[]>;
  loading: boolean = false;

  constructor(private commentService: CommentService,
              private issueService: IssueService,
              private avRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthenticationService) {
    if(!this.auth.isUserLoggedIn()) this.router.navigate(['login']);
  }

  ngOnInit() {
    if (this.avRoute.snapshot.params["reportNumber"]) {
      this.reportNumber = this.avRoute.snapshot.params["reportNumber"];
    }
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
    this.getIssue();
  }

  getIssue() {
    this.issueService.findByReportNumber(this.reportNumber).subscribe(
      data => {
        this.issue = data;
        if(this.issue.userById == this.auth._userId) this.getComments();
        else this.router.navigate(['/issue/list']);
      });
  }

  getComments() {
    this.commentList = this.commentService.findAllByIssueReportNumber(this.reportNumber);
  }

  addComment() {
    this.error = '';
    this.submitted = true;
    if (this.form.invalid || this.loading) return;
    this.blockForm();
    let comment = new Comment();
    comment.description = this.description.value;
    comment.commentTime = new Date();
    comment.author = "Cliente";
    comment.issueByReportNumber = this.reportNumber;
    this.commentService.createComment(comment).subscribe(
      data => {
        swal.fire({
          icon: 'success',
          text: 'Se ha agregado el comentario'
        }).finally(() => {
          this.clear();
          this.unBlockForm();
          this.getComments();
        });
      }, error => {
        this.unBlockForm();
      }
    );
  }

  blockForm() {
    this.loading = true;
    this.form.disable();
  }

  unBlockForm() {
    this.loading = false;
    this.form.enable();
  }

  clear() {
    this.form.reset();
  }
  
  get description() { return this.form.get('description'); }



}

