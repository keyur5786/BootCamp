import { Component, OnInit } from '@angular/core';
import {CourceService} from '../cource.service';
import { Cource } from '../cource';
import { Academy } from '../academy';
import { Location } from '../Location';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-cource',
  templateUrl: './cource.component.html',
  styleUrls: ['./cource.component.css'],
  providers: [CourceService,FlashMessagesService]
})
export class CourceComponent implements OnInit {
  myArray:any;
  cources:Cource[]=[];
  cource:Cource;

  ProgramType:any;
  ProgramTypeArray:any;

  // Academy:Academy[]; // To fill out dropdown
  ProgramLocationId:any;
  ProgramLocation:any; // To fill out dropdown

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

  CareerServices:any=false;
  Financing:any=false;
  Scholarship:any=false;

  toggleForm:boolean=false;
  showCources:boolean=false;

  constructor(private CourceService:CourceService,private flashMessage:FlashMessagesService,private router:Router) { }


  getCources(){
    this.CourceService.getCources()
    .subscribe(cource=>{
      this.cources = cource
    });
  }

  deletecource(id:any,subject:any){
    if(!confirm("Are You Sure To Delete "+subject+" ?")){
      return false;
    }
     var cources = this.cources;
     this.CourceService.deletecource(id)
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
  const newCource = {
    AcademyId:this.AcademyId,
    ProgramType:this.ProgramType,
    ProgramDuration:this.ProgramDuration,
    ProgramName:this.ProgramName,
    ProgramDescription:this.ProgramDescription,
    ProgramSubject:this.ProgramSubject,
    ProgramLocationId:this.ProgramLocationId,
    Cost:this.Cost,
    StartDate:this.StartDate,
    EndDate:this.EndDate,
    Length:this.Length,
    Classsize:this.Classsize,
    Commitment:this.Commitment,
    CareerServices:this.CareerServices,
    Financing:this.Financing,
    Scholarship:this.Scholarship,
    CreatedBy: localStorage.getItem("LoggerId")
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
  let newCource:Cource={
  _id: this.cource._id,
  AcademyId:form.value.AcademyId,
  ProgramType: form.value.ProgramType,
  ProgramDuration: form.value.ProgramDuration,
  ProgramName: form.value.ProgramName,
  ProgramDescription: form.value.ProgramDescription,
  ProgramSubject: form.value.ProgramSubject,
  ProgramLocationId: form.value.ProgramLocationId,
  Cost: form.value.Cost,
  StartDate: form.value.StartDate,
  EndDate:form.value.EndDate,
  Length: form.value.Length,
  Classsize: form.value.Classsize,
  Commitment: form.value.Commitment,
  CareerServices: form.value.CareerServices,
  Financing: form.value.Financing,
  Scholarship: form.value.Scholarship,
  UpdatedOn:moment().format('DD/MM/YYYY HH:MM:SS'),
  UpdatedBy: localStorage.getItem("LoggerId")
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

    this.CourceService.getCources()
    .subscribe(cources=>{
      console.log(cources);
      this.cources = cources[0];
      this.Academy = cources[1];
      this.ProgramLocation = cources[2];
      this.ProgramTypeArray = [{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
      this.AcademyId="";
      this.ProgramLocationId="";
      this.ProgramType="";
    });
  });
  }

showEditForm(cource){
  // console.log(JSON.stringify(cource.ProgramLocationId._id));
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
    else if(statusId==3)
    {
      if(!confirm("Are You Sure To Live "+programname)){
        return false;
      }
    }
    else if(statusId==4)
    {
      if(!confirm("Are You Sure To Deactivate "+programname)){
        return false;
      }
    }
    var createdBy = localStorage.getItem("LoggerId");
    this.CourceService.changeStatus(statusRecordId,statusId,academyid,createdBy)
    .subscribe(result=>{
      this.flashMessage.show(result,{cssClass:'alert-success',timeout:3000});
    });
  }

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['admin']);
    }
    this.CourceService.getCources()
    .subscribe(cources=>{
      this.cources = cources[0];
      this.Academy = cources[1];
      this.ProgramLocation = cources[2];
      this.AcademyId="";
      this.ProgramLocationId="";
      this.ProgramTypeArray = [{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
      this.ProgramType="";
      this.ProgramDuration="";
      this.ProgramName="";
      this.ProgramDescription="";
      this.ProgramSubject="";
      this.Cost="";
      this.StartDate="";
      this.EndDate="";
      this.Length="";
      this.Classsize="";
      this.Commitment="";
      this.CareerServices="";
      this.Financing="";
      this.Scholarship="";
      this.toggleForm=false;
    }
    );
}


}
