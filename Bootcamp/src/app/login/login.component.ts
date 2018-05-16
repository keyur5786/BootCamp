import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from '../login-service.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginServiceService,FlashMessagesService]
})
export class LoginComponent implements OnInit {
UserName:string;
Password:string;
  constructor(
    private LoginServiceService:LoginServiceService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  onLogin(){
    const user = {
      UserName : this.UserName,
      Password : this.Password
    }
    console.log("USER = "+JSON.stringify(user));
    this.LoginServiceService.authenticateUser(user).subscribe(data=>{
    console.log("Logger = "+JSON.stringify(data[0]));
      if(data[0].UserName){
        sessionStorage.setItem('isLogin',"True");
        localStorage.setItem('LoggerId', data[0]._id);
        localStorage.removeItem('AcademyID');
        localStorage.setItem('LoggerName', data[0].UserName);
        this.flashMessage.show("You are login",{cssClass : 'alert-success',timeout:5000});
        this.router.navigate(['adminHome']);
      }else{
        this.flashMessage.show(data,{cssClass : 'alert-danger',timeout:5000});
      }
    });
  }

clear(){
  this.UserName = "",
  this.Password = ""
}

}
