import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-request-list',
  templateUrl: './client-request-list.component.html',
  styleUrls: ['./client-request-list.component.css']
})
export class ClientRequestListComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  closeResult: string;

  ngOnInit() {
  }
  openRequestDetails(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}