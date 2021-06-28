import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {

    Swal.fire({ title: "Te esperamos pronto", timer: 1500 });
    
  }

}
