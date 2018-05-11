import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Academy} from '../academy';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-academy-register',
  templateUrl: './academy-register.component.html',
  styleUrls: ['./academy-register.component.css'],
  providers: [RegisterService,FlashMessagesService]
})
export class AcademyRegisterComponent implements OnInit {
  AcademyName: string;
  AcademyWebsite: string;
  AcademyLogo: string;
  AcademyProfileImage: string;
  AcademyFounded: string;
  Headquarters:string;
  AcademyDiscription:string;
  ZipCode:string;
  constructor(
    private RegisterService:RegisterService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onAcademyRegister(){
      const Academy = {
        AcademyId :localStorage.getItem('AcademyID'),
        AcademyName: this.AcademyName,
        AcademyWebsite: this.AcademyWebsite,
        AcademyLogo: this.AcademyLogo,
        AcademyProfileImage: this.AcademyProfileImage,
        AcademyFounded: this.AcademyFounded,
        Headquarters:this.Headquarters,
        AcademyDiscription:this.AcademyDiscription,
        ZipCode:this.ZipCode,
        UpdatedOn:moment().format('DD/MM/YYYY HH:MM:SS'),
        UpdatedBy:localStorage.getItem("AcademyID")
      }
      this.RegisterService.registerAcademy(Academy).subscribe(data=>{
        if(data){
           //this.flashMessage.show("Registered sucessfully!!!",{cssClass : 'alert-success',timeout:5000});
           this.router.navigate(['academy']);
        }else{
          this.flashMessage.show(data,{cssClass : 'alert-danger',timeout:5000});
        }
      });
  }

}
