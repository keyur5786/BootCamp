import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Academy} from '../academy';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css'],
  providers: [RegisterService,FlashMessagesService]
})
export class ProfileupdateComponent implements OnInit {
  academies:Academy[]=[];
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
     var checkLogin = localStorage.getItem("AcademyID");
    if(checkLogin==null){
      this.router.navigate(['login']);
    }
    this.RegisterService.getAcademy(checkLogin)
    .subscribe(Academy=>{
      this.academies = Academy[0];
      console.log("Academy Data ="+ JSON.stringify(this.academies));
    });
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

editProfile(form){
    var bool=true;
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
           this.RegisterService.uploadMediaFileU(formData).subscribe(
             data => {
        if(data.success){
          const Academy = {
         AcademyId :localStorage.getItem('AcademyID'),
         AcademyName: form.value.AcademyName,
         AcademyWebsite: form.value.AcademyWebsite,
         AcademyFounded: form.value.AcademyFounded,
         Headquarters:form.value.Headquarters,
         AcademyDiscription:form.value.AcademyDiscription,
         ZipCode:form.value.ZipCode,
         UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
         UpdatedBy:localStorage.getItem("AcademyID"),
         UserName:localStorage.getItem("LoggerName")
       };
       this.RegisterService.Updateprofile(Academy)
       .subscribe(result=>{
         if(result.success){
           this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
           //this.router.navigate(['profileupdate']);
            this.ngOnInit();
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
}
