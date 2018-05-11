import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-academy-navbar',
  templateUrl: './academy-navbar.component.html',
  styleUrls: ['./academy-navbar.component.css']
})
export class AcademyNavbarComponent implements OnInit {
  LoggerName:string=localStorage.getItem('LoggerName');
  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout(){
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['']);
  }


}
