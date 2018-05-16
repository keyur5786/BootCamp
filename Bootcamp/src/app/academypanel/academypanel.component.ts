import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-academypanel',
  templateUrl: './academypanel.component.html',
  styleUrls: ['./academypanel.component.css'],
  providers: [LoginServiceService]
})
export class AcademypanelComponent implements OnInit {
LoggerName:string=localStorage.getItem('LoggerName');
  constructor(private router:Router,private LoginServiceService:LoginServiceService) { }

  ngOnInit() {
  }

  logout(){;
    this.LoginServiceService.logoutAcademy(localStorage.getItem('AcademyID'),localStorage.getItem('LoggerName'))
    .subscribe(result=>{
      if(result.success){
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }

}
