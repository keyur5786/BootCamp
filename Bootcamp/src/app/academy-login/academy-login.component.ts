import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AcademyLoginService} from '../academy-login.service';
import { Register } from '../register';

@Component({
  selector: 'app-academy-login',
  templateUrl: './academy-login.component.html',
  styleUrls: ['./academy-login.component.css'],
  providers: [AcademyLoginService,FlashMessagesService]
})
export class AcademyLoginComponent implements OnInit {
  Email:any;
  Password:any;
  otpPopUp:boolean=false;
  sendotp:string;
  Auth_code:string;
  tempCode:string;
  tempEmail:string;
  constructor(
    private AcademyLoginService:AcademyLoginService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    localStorage.clear();
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
          sessionStorage.setItem('isLogin',"True");
          localStorage.setItem('AcademyID', data[0]._id);
          localStorage.setItem('LoggerName',this.Email);
          if(data[0].isVerify==false){
            // var otp=Math.floor((Math.random() * 9999) + 1000);
            // // sessionStorage.setItem('OTP',otp.toString());
            // this.AcademyLoginService.sendOtp(data[0].EmailId,otp).subscribe(data1=>{
            //   if(data1.success){
            //     this.tempCode=otp.toString();
            //     this.tempEmail=data[0].EmailId;
            //     this.otpPopUp=true;
            //      //this.flashMessage.show("login sucessfully!!!",{cssClass : 'alert-success',timeout:5000});
            //      //this.router.navigate(['login']);
            //   }else{
            //     this.flashMessage.show(data1,{cssClass : 'alert-danger',timeout:5000});
            //   }
            // });
            this.router.navigate(['academyRegister']);
          }else{
            this.router.navigate(['academyRegister']);
          }
        }else{
          localStorage.setItem('AcademyID', data[0]._id);
          localStorage.removeItem('LoggerId');
          localStorage.setItem('LoggerName', data[0].AcademyName);
          this.router.navigate(['academyHome']);
        }
      }else{
        this.flashMessage.show(data,{cssClass : 'alert-danger',timeout:5000});
      }
    });
  }

  SendOTP(){

    if(this.sendotp==this.tempCode){
      this.AcademyLoginService.updateVerification(this.tempEmail)
      .subscribe(data=>{
        this.router.navigate(['academyRegister']);
      });

    }else{
      this.flashMessage.show("OTP Varification Fail ! Try Again",{cssClass : 'alert-danger',timeout:5000});
      this.otpPopUp=false;
    }
  }

  clear(){
    this.Email = "",
    this.Password = ""
  }


}
