import { Component, OnInit } from '@angular/core';
import {AcademyService} from '../academy.service';
import {Academy} from '../academy';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginServiceService} from '../login-service.service';
@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css'],
  providers: [AcademyService,FlashMessagesService,LoginServiceService]
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
  logoPath:any;
  // UpdatedOn:any;
 toggleForm:boolean=false;

 UserRights:any;
 academyAdd:boolean=false;
 academyEdit:boolean=false;
 academyDelete:boolean=false;
  constructor(private LoginServiceService:LoginServiceService,private AcademyService:AcademyService,private flashMessage:FlashMessagesService,private router:Router) { }

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['']);
    }

    this.LoginServiceService.GetRightsListByUserId(localStorage.getItem('LoggerId'))
    .subscribe(data=>{
      this.UserRights=data;
      for (let i = 0; i < this.UserRights.length; i++) {
          if(this.UserRights[i].FormName == "Academy")
          {
            if(this.UserRights[i].View == false)
            {
              this.router.navigate(['adminHome']);
              return false;
            }
            if(this.UserRights[i].Add == true){
              this.academyAdd = true;
            }
            if(this.UserRights[i].Edit==true){
              this.academyEdit = true;
            }
            if(this.UserRights[i].Delete==true){
              this.academyDelete = true;
            }
            this.AcademyService.getAcademy()
            .subscribe(Academy=>{
              // for(var i=0;i<Academy.length;i++){
              //   Academy[i]["TempLogo"] = "../../assets/"+Academy[i].AcademyLogo;
              // }
              console.log(JSON.stringify(Academy));
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
        }
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
                  //this.flashMessage.show(data.success,{cssClass:'alert-success',timeout:3000});
                  // Record Insertion Start
                  const newAcademy ={
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
                      CreatedBy: localStorage.getItem("LoggerId"),
                      CreatedOn: moment().format("DD-MM-YYYY HH:mm:ss"),
                      UserType: "Admin",
                      UserName: localStorage.getItem("LoggerName")
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

    showEditForm(academy,logoPath){
    this.Academy= academy;
    this.toggleForm = true;
    this.logoPath=logoPath;
    }

    deleteAcademy(id:any,academyname:any){
      if(!confirm("Are You Sure To Delete "+academyname+" ?")){
        return false;
      }
       var academies = this.academies;
       var UserId = localStorage.getItem("LoggerId");
       var UserName = localStorage.getItem("LoggerName");
       this.AcademyService.deleteAcademy(id,UserId,UserName)
     .subscribe(data=>{
        if(data.msg){
         for(var i=0; i<academies.length;i++){
            if(academies[i]._id==id){
             academies.splice(i,1);
           }
         }
       }
       else{
         this.flashMessage.show(data.defaultError,{cssClass:'alert-danger',timeout:5000});
         return false;
       }
          this.AcademyService.getAcademy()
         .subscribe(academies=>
           this.academies = academies);})
     }

     editAcademy(form){

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
                   //this.flashMessage.show(data.success,{cssClass:'alert-success',timeout:3000});

         const newAcademy={
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
           UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
           UpdatedBy:localStorage.getItem("LoggerId"),
           UserType:"Admin",
           UserName:localStorage.getItem("LoggerName")
     }

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
});
}
}
}

activateAcademy(academyId,academyName){
  if(!confirm("Are You Sure To Activate "+academyName+" ?")){
    return false;
  }
  const academyObject = {
    academyId: academyId,
    UpdatedBy:localStorage.getItem("LoggerId"),
    UserName:localStorage.getItem("LoggerName")
  };
  this.AcademyService.activateAcademy(academyObject)
  .subscribe(academy=>{
    this.flashMessage.show(academy.success,{cssClass:'alert-success',timeout:3000});
    this.ngOnInit();
  });
}

deactivateAcademy(academyId,academyName){
  if(!confirm("Are You Sure To Dectivate "+academyName+" ?")){
    return false;
  }
  const academyObject = {
    academyId: academyId,
    UpdatedBy:localStorage.getItem("LoggerId"),
    UserName:localStorage.getItem("LoggerName")
  };
  this.AcademyService.deactivateAcademy(academyObject)
  .subscribe(academy=>{
    this.flashMessage.show(academy.success,{cssClass:'alert-success',timeout:3000});
    this.ngOnInit();
  });
}
}
