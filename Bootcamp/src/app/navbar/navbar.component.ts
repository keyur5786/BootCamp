import { Component, OnInit, Output } from '@angular/core';
import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [LoginServiceService]
})
export class NavbarComponent implements OnInit {
  LoggerName:string=localStorage.getItem('LoggerName');
  UserRights:any;

  // For View
  locatonView:boolean=false;
  userView:boolean=false;
  academyView:boolean=false;
  couseView:boolean=false;
  activityLog:boolean=false;
  inquiryView:boolean=false;


  constructor(private router:Router,private LoginServiceService:LoginServiceService) { }

  ngOnInit() {
    if(sessionStorage.getItem("isLogin")!="True"){
      this.router.navigate(['']);
    }
    //console.log("User Id on init: "+localStorage.getItem('LoggerId'));
    this.LoginServiceService.GetRightsListByUserId(localStorage.getItem('LoggerId'))
    .subscribe(data=>{
      this.UserRights=data;
      for (let i = 0; i < this.UserRights.length; i++) {
          if(this.UserRights[i].FormName == "Location")
          {
            if(this.UserRights[i].View == true)
            {
              this.locatonView=true;
            }
          }
          else if(this.UserRights[i].FormName == "User"){
            if(this.UserRights[i].View == true)
            {
              this.userView=true;
            }
          }
          else if(this.UserRights[i].FormName == "Academy"){
            if(this.UserRights[i].View == true)
            {
              this.academyView=true;
            }
          }
          else if(this.UserRights[i].FormName == "Course"){
            if(this.UserRights[i].View == true)
            {
              this.couseView=true;
            }
          }
          else if(this.UserRights[i].FormName == "ActivityLog"){
            if(this.UserRights[i].View == true)
            {
              this.activityLog=true;
            }
          }
          else if(this.UserRights[i].FormName == "Inquiries"){
            if(this.UserRights[i].View == true)
            {
              this.inquiryView=true;
            }
          }
      }
    });

  }

logout(){
  this.LoginServiceService.logoutUser(localStorage.getItem('LoggerId'),localStorage.getItem("LoggerName"))
  .subscribe(result=>{
    if(result.success){
      localStorage.clear();
      this.router.navigate(['admin']);
    }
  });
}


}
