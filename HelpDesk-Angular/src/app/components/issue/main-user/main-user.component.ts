import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logOut() {

    Swal.fire({ title: "Te esperamos pronto", timer: 1500 });
    
  }
}
