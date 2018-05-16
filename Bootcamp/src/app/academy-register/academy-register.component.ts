import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Academy} from '../academy';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormControl} from '@angular/forms';

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
  AcademyFounded: string;
  Headquarters:string;
  AcademyDiscription:string;
  ZipCode:string;
  files:any;

  constructor(
    private RegisterService:RegisterService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  validation(){
    var valid=true;
    if(this.AcademyName==null || this.AcademyWebsite==null || this.AcademyFounded==null || this.AcademyDiscription==null || this.ZipCode==null ||this.Headquarters==null ){
      this.flashMessage.show('Fill Out Required Fields !',{cssClass : 'alert-danger',timeout:5000});
      valid=false;
    }
    if(valid){
      return true;
    }else{
      return false;
    }
  }

  fileChange(event) {
    if (event.target.files.length > 0) {
      this.files=event.target.files;
    }
  }
  onAcademyRegister(){
    var bool=this.validation();
    if(!bool)
    {
      return false;
    }
    let formData: FormData = new FormData();
    //let filename
    if (this.files == null && this.files.length <= 0) {
      this.flashMessage.show("Please select academy logo",{cssClass:'alert-danger',timeout:5000});
      return false;
    }
    else
    {
      var extention =  this.files[0].name.split('.');
      if(extention[extention.length - 1] == "jpeg" ||
         extention[extention.length - 1] == "jpg" ||
         extention[extention.length - 1] == "png" ||
         extention[extention.length - 1] == "bmp"){
           formData.append('file', this.files[0]);
           /////Start Logo Image Upload //////////
           this.RegisterService.uploadMediaFileR(formData).subscribe(
             data => {
                if(data.success){
          const Academy = {
         AcademyId :localStorage.getItem('AcademyID'),
         AcademyName: this.AcademyName,
         AcademyWebsite: this.AcademyWebsite,
         AcademyLogo: this.AcademyLogo,
         AcademyFounded: this.AcademyFounded,
         Headquarters:this.Headquarters,
         AcademyDiscription:this.AcademyDiscription,
         ZipCode:this.ZipCode,
         UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
         UpdatedBy:localStorage.getItem("AcademyID")
       };
       this.RegisterService.registerAcademy(Academy)
       .subscribe(result=>{
         if(result.success){
           this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
           this.router.navigate(['academyHome']);
           // this.ngOnInit();
         }else{
           if(result.defaultError){
             this.flashMessage.show(result.defaultError,{cssClass:'alert-danger',timeout:5000});
             return false;
           }
           var messageArray = result.error.split(":");
           var error = messageArray[2].replace(/!.*/,"!");
           this.flashMessage.show(error,{cssClass:'alert-danger',timeout:5000});
         }
       });
       // Record Insertion End
   }
 },
 err => {
   console.log(err);
   return false;
 }
);
//////End Logo Image Upload code/////////////
}
else
{
this.flashMessage.show("Please select only image [jpeg, jpg, png, bmp]",{cssClass:'alert-danger',timeout:5000});
return false;
}
}
}
      // this.RegisterService.registerAcademy(Academy).subscribe(data=>{
      //   if(data){
      //      //this.flashMessage.show("Registered sucessfully!!!",{cssClass : 'alert-success',timeout:5000});
      //      this.router.navigate(['academypanel']);
      //   }else{
      //     this.flashMessage.show(data,{cssClass : 'alert-danger',timeout:5000});
      //   }
      // });



}
