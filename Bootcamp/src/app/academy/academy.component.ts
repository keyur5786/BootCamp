import { Component, OnInit } from '@angular/core';
import {AcademyService} from '../academy.service';
import {Academy} from '../academy';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css'],
  providers: [AcademyService,FlashMessagesService]
})
export class AcademyComponent implements OnInit {
  academies:Academy[]=[];
  Academy:Academy;
  AcademyName: string;
  AcademyWebsite: string;
  AcademyLogo: string;
  AcademyProfileImage: string;
  AcademyFounded: string;
  Headquarters:string;
  AcademyDiscription:string;
  ZipCode:string;
  EmailId:string;
  Password:string;
  files:any;
  // UpdatedOn:any;
 toggleForm:boolean=false;
  constructor(private AcademyService:AcademyService,private flashMessage:FlashMessagesService,private router:Router) { }

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['admin']);
    }
    this.AcademyService.getAcademy()
    .subscribe(Academy=>{
      this.academies = Academy;
      this.AcademyName="";
      this.AcademyWebsite="";
      this.AcademyLogo="";
      this.AcademyProfileImage="";
      this.AcademyFounded="";
      this.Headquarters="";
      this.AcademyDiscription="";
      this.ZipCode="";
      this.EmailId="";
      this.Password="";
      this.toggleForm=false;
    });
  }

  validation(){
    var valid=true;
    if(this.AcademyName==null || this.AcademyWebsite==null || this.AcademyFounded==null || this.AcademyDiscription==null || this.ZipCode==null || this.EmailId==null || this.Headquarters==null || this.Password==null){
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

  getAcademy(){
    this.AcademyService.getAcademy()
    .subscribe(Academy=>{
      this.academies = Academy

    });
  }

    addAcademy(){
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

          // fileName="logo"+moment().format('DMYYYYHHMMSS')+"."+extention[extention.length - 1];
          //fileName=localStorage.getItem('logo');
           //localStorage.setItem('logo',file)
          // this.files[0].name=fileName;

           formData.append('file', this.files[0]);

           /////Start Logo Image Upload //////////
           console.log(this.files[0]);

           this.AcademyService.uploadMediaFile(formData).subscribe(
             data => {
                if(data.success){
                  this.flashMessage.show(data.success,{cssClass:'alert-success',timeout:3000});
                  // Record Insertion Start
                  let newAcademy:Academy={
                      AcademyName:  this.AcademyName,
                      AcademyWebsite:  this.AcademyWebsite,
                      AcademyLogo:  this.AcademyLogo,
                      AcademyProfileImage:  this.AcademyProfileImage,
                      AcademyFounded:  this.AcademyFounded,
                      Headquarters: this.Headquarters,
                      AcademyDiscription: this.AcademyDiscription,
                      ZipCode: this.ZipCode,
                      EmailId: this.EmailId,
                      Password: this.Password,
                      CreatedBy: localStorage.getItem("LoggerId")
                    };
                    this.AcademyService.addAcademy(newAcademy)
                    .subscribe(result=>{
                      if(result.success){
                        this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
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

    showEditForm(academy){
    this.Academy= academy;
    this.toggleForm = true;
    }

    deleteAcademy(id:any){
      console.log(id);
       var academies = this.academies;
       this.AcademyService.deleteAcademy(id)
     .subscribe(data=>{
        if(data.n==1){
         for(var i=0; i<academies.length;i++){
            if(academies[i]._id==id){
             academies.splice(i,1);
           }
         }

       }
   this.AcademyService.getAcademy()
         .subscribe(academies=>
           this.academies = academies);})
     }

     editAcademy(form){
     let newAcademy:Academy={
       _id: this.Academy._id,
       AcademyName:form.value.AcademyName,
       AcademyWebsite:form.value.AcademyWebsite,
       AcademyLogo:form.value.AcademyLogo,
       AcademyProfileImage:form.value.AcademyProfileImage,
       AcademyFounded:form.value.AcademyFounded,
       Headquarters:form.value.Headquarters,
       AcademyDiscription:form.value.AcademyDiscription,
       ZipCode:form.value.ZipCode,
       EmailId: form.value.EmailId,
       Password:form.value.Password,
       UpdatedOn:moment().format('DD/MM/YYYY HH:MM:SS'),
       UpdatedBy:localStorage.getItem("LoggerId")
     }
    var path='../../public/logo842018144559.jpeg';
     this.AcademyService.updateAcademy(newAcademy)
     .subscribe(result=>{
       if(result.success){
         this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
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

}
}
