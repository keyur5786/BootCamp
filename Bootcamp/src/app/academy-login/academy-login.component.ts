import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AcademyLoginService} from '../academy-login.service';
@Component({
  selector: 'app-academy-login',
  templateUrl: './academy-login.component.html',
  styleUrls: ['./academy-login.component.css'],
  providers: [AcademyLoginService,FlashMessagesService]
})
export class AcademyLoginComponent implements OnInit {
  Email:any;
  Password:any;

  constructor(
    private AcademyLoginService:AcademyLoginService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onAcademyLogin(){
    if(this.Email==null){
      this.flashMessage.show("Email Is Required !",{cssClass : 'alert-danger',timeout:5000});
      return false;
    }
    if(this.Password==null){
      this.flashMessage.show("Password Is Required !",{cssClass : 'alert-danger',timeout:5000});
      return false;
    }
    const academy = {
      Email : this.Email,
      Password : this.Password
    }
    this.AcademyLoginService.authenticateAcademy(academy).subscribe(data=>{
      if(data[0].EmailId){
        if(data[0].AcademyName==null){
          localStorage.setItem('AcademyID', data[0]._id);
          this.router.navigate(['academyRegister']);
        }else{
          localStorage.setItem('AcademyID', data[0]._id);
          localStorage.setItem('LoggerName', data[0].AcademyName);
          this.router.navigate(['academyCourse']);
        }
      }else{
        this.flashMessage.show(data,{cssClass : 'alert-danger',timeout:5000});
      }
    });
  }

  clear(){
    this.Email = "",
    this.Password = ""
  }


}
