import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-academy-navbar',
  templateUrl: './academy-navbar.component.html',
  styleUrls: ['./academy-navbar.component.css'],
  providers: [LoginServiceService]
})
export class AcademyNavbarComponent implements OnInit {
  LoggerName:string=localStorage.getItem('LoggerName');
  constructor(private router:Router,private LoginServiceService:LoginServiceService) { }

  ngOnInit() {
    if(sessionStorage.getItem("isLogin")!="True"){
      this.router.navigate(['']);
    }
  }

  logout(){
    this.LoginServiceService.logoutAcademy(localStorage.getItem('AcademyID'),localStorage.getItem('LoggerName'))
    .subscribe(result=>{
      if(result.success){
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }


}
