import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-client',
  templateUrl: './main-client.component.html',
  styleUrls: ['./main-client.component.css']
})
export class MainClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut() {

    Swal.fire({ title: "Te esperamos pronto", timer: 1500 });
    
  }

}
