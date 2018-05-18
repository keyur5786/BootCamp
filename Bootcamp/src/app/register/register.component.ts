import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import { Register } from '../register';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService,FlashMessagesService]
})
export class RegisterComponent implements OnInit {

  // registers:Register[]=[];
  // register:Register;
  EmailId: string;
  Password: string;
  ConfirmPassword: string;
 // toggleForm:boolean=false;

  constructor(
    private RegisterService:RegisterService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onRegister(){
    if(this.EmailId==null){
      this.flashMessage.show('Email ID Is Required !',{cssClass : 'alert-danger',timeout:5000});
      return false;
    }
    if(this.Password==null){
      this.flashMessage.show('Password Is Required !',{cssClass : 'alert-danger',timeout:5000});
      return false;
    }
    if(this.ConfirmPassword==null){
      this.flashMessage.show('Confirm Password Is Required !',{cssClass : 'alert-danger',timeout:5000});
      return false;
    }
    if(this.Password!=this.ConfirmPassword){
      this.flashMessage.show('Your Password & Confirm Password Does Not Match',{cssClass : 'alert-danger',timeout:5000});
    }
    else{
      const Academy = {
        EmailId : this.EmailId,
        Password : this.Password,
        CreatedBy : "By Self",
        CreatedOn : moment().format("DD-MM-YYYY HH:mm:ss")
      }
      this.RegisterService.addAcademy(Academy).subscribe(data=>{
        if(data.success){
          // this.flashMessage.show("Registered sucessfully!!!",{cssClass : 'alert-success',timeout:5000});
           this.router.navigate(['login']);
        }else{
          if(data.defaultError){
            this.flashMessage.show(data.defaultError,{cssClass:'alert-danger',timeout:5000});
            return false;
          }
          var messageArray = data.error.split(":");
          var error = messageArray[2].replace(/!.*/,"!");
          this.flashMessage.show(error,{cssClass:'alert-danger',timeout:5000});
        }
      });
    }

  }

}
