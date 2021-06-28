import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {

    Swal.fire({ title: "Te esperamos pronto", timer: 1500 });
    
  }

}
