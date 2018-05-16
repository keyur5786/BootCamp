import { Component, OnInit } from '@angular/core';
import {CourceService} from '../cource.service';
import { Cource } from '../cource';
import { Academy } from '../academy';
import { Location } from '../Location';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-academy-course',
  templateUrl: './academy-course.component.html',
  styleUrls: ['./academy-course.component.css'],
  providers: [CourceService,FlashMessagesService]
})
export class AcademyCourseComponent implements OnInit {
  myArray:any;
  cources:Cource[]=[];
  cource:Cource;

  ProgramType:any;
  ProgramTypeArray:any;

  // Academy:Academy[]; // To fill out dropdown
  ProgramLocationId:any;
  ProgramLocation:any; // To fill out dropdown
  LocationName:any;

  AcademyId:any;
  Academy:any; // To fill out academy in dropdown

  ProgramDuration:string;
  ProgramName:string;
  ProgramDescription:string;
  ProgramSubject:string;

  Cost:string;
  StartDate:string;
  EndDate:string;
  Length:string;
  Classsize:string;
  Commitment:string;

  CareerServices:boolean=false;
  Financing:boolean=false;
  Scholarship:boolean=false;

  toggleForm:boolean=false;
  showCources:boolean=false;

  constructor(private CourceService:CourceService,private flashMessage:FlashMessagesService,private router:Router) { }


  getCources(){
    this.CourceService.getCources()
    .subscribe(cource=>{
      this.cources = cource
    });
  }

  getLocationName(event:Event){
    let selectElementText = event.target['options']
     [event.target['options'].selectedIndex].text;
     this.LocationName = selectElementText;
     console.log("From Load = "+this.LocationName);
  }

  deletecource(id:any,program:any){
    if(!confirm("Are You Sure To Delete "+program+" ?")){
      return false;
    }
     var cources = this.cources;
     var UserId = localStorage.getItem("AcademyID");
     var UserName = localStorage.getItem("LoggerName");
     var UserType = "Academy";
     this.CourceService.deletecource(id,UserId,UserName,UserType)
   .subscribe(data=>{
      if(data.n==1){

       for(var i=0; i<cources.length;i++){
          if(cources[i]._id==id){
           cources.splice(i,1);
         }
       }

     }
     this.CourceService.getCources()
     .subscribe(cources=>{
       console.log(cources);
       this.cources = cources[0];
       this.Academy = cources[1];
       this.ProgramLocation = cources[2];
       this.ProgramType = [{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
     });
       })
   }

addCource(){
  if(this.EndDate<this.StartDate){
    this.flashMessage.show("EndDate Should Be Gratter Than StartDate !",{cssClass:'alert-danger',timeout:5000});
    return false;
  }
  const newCource = {
    AcademyId:this.AcademyId,
    ProgramType:this.ProgramType,
    ProgramDuration:this.ProgramDuration,
    ProgramName:this.ProgramName,
    ProgramDescription:this.ProgramDescription,
    ProgramSubject:this.ProgramSubject,
    ProgramLocationId:this.ProgramLocationId,
    LocationName:this.LocationName,
    Cost:this.Cost,
    StartDate:this.StartDate,
    EndDate:this.EndDate,
    Length:this.Length,
    Classsize:this.Classsize,
    Commitment:this.Commitment,
    CareerServices:this.CareerServices,
    Financing:this.Financing,
    Scholarship:this.Scholarship,
    ByAcademy:true,
    UserType:"Academy",
    CreatedBy:localStorage.getItem("AcademyID"),
    CreatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
    UserName:localStorage.getItem("LoggerName")
  }
  this.CourceService.addCource(newCource).subscribe(result=>{
    if(result.success){
      this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:5000});
      this.ngOnInit();
    }
    else{
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

editCorce(form){
  if(form.value.EndDate<form.value.StartDate){
    this.flashMessage.show("EndDate Should Be Gratter Than StartDate !",{cssClass:'alert-danger',timeout:5000});
    return false;
  }
  const newCource={
    _id: this.cource._id,
  AcademyId:form.value.AcademyId,
  ProgramType: form.value.ProgramType,
  ProgramDuration: form.value.ProgramDuration,
  ProgramName: form.value.ProgramName,
  ProgramDescription: form.value.ProgramDescription,
  ProgramSubject: form.value.ProgramSubject,
  ProgramLocationId: form.value.ProgramLocationId,
  LocationName:this.LocationName,
  Cost: form.value.Cost,
  StartDate: form.value.StartDate,
  EndDate:form.value.EndDate,
  Length: form.value.Length,
  Classsize: form.value.Classsize,
  Commitment: form.value.Commitment,
  CareerServices: form.value.CareerServices,
  Financing: form.value.Financing,
  Scholarship: form.value.Scholarship,
  UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
  UpdatedBy:localStorage.getItem("AcademyID"),
  UserType:"Academy",
  UserName:localStorage.getItem("LoggerName")
  }
  this.CourceService.updateCource(newCource)
  .subscribe(result=>{
    if(result.success){
      this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:5000});
      this.ngOnInit();
    }
    else{
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

showEditForm(cource){
  console.log("From Edit = "+JSON.stringify(this.ProgramLocation));
  for(var i=0;i<this.ProgramLocation.length;i++){
    if(this.ProgramLocation[i]._id==cource.ProgramLocationId._id){
      this.LocationName = this.ProgramLocation[i].Loc_name;
      break;
    }
  }
  // console.log("After Edit = "+JSON.stringify(this.LocationName));
  this.AcademyId = cource.AcademyId._id;
  this.ProgramLocationId = cource.ProgramLocationId._id;
  this.ProgramType = cource.ProgramType;
  this.ProgramTypeArray=[{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
  this.cource= cource;
  this.toggleForm = true;
  }

  changeStatus(statusRecordId,statusId,programname,academyid){
    if(statusId==1){
      if(!confirm("Are You Sure To Draft "+programname)){
        return false;
      }
    }
    else if(statusId==2)
    {
      if(!confirm("Are You Sure To Publish "+programname)){
        return false;
      }
    }
    var createdBy = localStorage.getItem("AcademyID");
    var UserType = "Academy";
    var UserName = localStorage.getItem("LoggerName");
    this.CourceService.changeStatus(statusRecordId,statusId,academyid,createdBy,UserType,UserName)
    .subscribe(result=>{
      this.flashMessage.show(result,{cssClass:'alert-success',timeout:3000});
    });
  }

  ngOnInit() {
    var checkLogin = localStorage.getItem("AcademyID");
    if(checkLogin==null){
      this.router.navigate(['login']);
    }
    this.CourceService.getMyCources(checkLogin)
    .subscribe(cources=>{
      console.log(cources);
      this.cources = cources[0];
      this.Academy = cources[1];
      this.ProgramLocation = cources[2];
      this.AcademyId=localStorage.getItem("AcademyID");
      this.ProgramLocationId="";
      this.ProgramTypeArray = [{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
      this.ProgramType="";
      this.ProgramDuration="";
      this.ProgramName="";
      this.ProgramDescription="";
      this.ProgramSubject="";
      this.Cost="";
      this.Length="";
      this.Classsize="";
      this.Commitment="";
      this.toggleForm=false;
    }
    );
}

activateCourse(courseId,courseName){
  if(!confirm("Are You Sure To Activate "+courseName+" ?")){
    return false;
  }
  const courseObject = {
    courseId: courseId,
    UpdatedBy:localStorage.getItem("AcademyID"),
    UserName:localStorage.getItem("LoggerName"),
    UserType:"Academy"
  };
  this.CourceService.activateCourse(courseObject)
  .subscribe(couse=>{
    this.flashMessage.show(couse.success,{cssClass:'alert-success',timeout:3000});
    this.ngOnInit();
  });
}

deactivateCourse(courseId,couseName){
  if(!confirm("Are You Sure To Dectivate "+couseName+" ?")){
    return false;
  }
  const courseObject = {
    courseId: courseId,
    UpdatedBy:localStorage.getItem("AcademyID"),
    UserName:localStorage.getItem("LoggerName"),
    UserType:"Academy"
  };
  this.CourceService.deactivateCourse(courseObject)
  .subscribe(couse=>{
    this.flashMessage.show(couse.success,{cssClass:'alert-success',timeout:3000});
    this.ngOnInit();
  });
}

}
