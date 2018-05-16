import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CourseDetailsService} from '../course-details.service';
import {InquiryService} from '../inquiry.service';
import {Course} from '../CourseDetails';
import {Academy} from '../CourseDetails';
import {FlashMessagesService} from 'angular2-flash-messages';
import * as $ from 'jquery';
// declare var jquery:any;
// declare var $ :any;

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
    providers: [CourseDetailsService,FlashMessagesService,InquiryService]
})
export class CourseDetailsComponent implements OnInit {

  constructor(private InquiryService:InquiryService,private CourseDetailsService:CourseDetailsService,private route: ActivatedRoute,private router: Router,private flashMessage:FlashMessagesService) { }

  academyDetail:Academy[]=[];
  cource:any;
  academy:any;
  ProgramId:string;
  AcademyId:string;
  POPUP:boolean= false;

  PopAcademyId:any=localStorage.getItem('Inquiry_AcademyId');
  PopCourseId:any=localStorage.getItem('Inquiry_CourseId');
  PopPhone:any;
  PopEmailId:any;
  PopName:any;
  PopNotes:any;
  ngOnInit() {

    // this.route
    //     .queryParams
    //     .subscribe(params => {
    //       // Defaults to 0 if no query param provided.
    //       this.ProgramId = params['programId'] || null;
    //       this.AcademyId = params['academyId'] || null;
    //     });
    if(localStorage.getItem("Inquiry_CourseId")==null || localStorage.getItem("Inquiry_AcademyId")==null){
    this.router.navigate(['']);
  }
    this.ProgramId = localStorage.getItem("Inquiry_CourseId");
    this.AcademyId = localStorage.getItem("Inquiry_AcademyId");
        console.log(this.ProgramId +"||"+this.AcademyId);
        this.getCoureseDetails();
        this.getAcademyDetails();

  }

  onInquiry(){
    const newInquiry = {
      AcademyId : this.PopAcademyId,
      CourseId : this.PopCourseId,
      Name : this.PopName,
      Phone : this.PopPhone,
      EmailId : this.PopEmailId,
      Notes : this.PopNotes,
    }
    this.InquiryService.inquiry(newInquiry)
    .subscribe(result=>{
      if(result.success){
        this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
        this.PopAcademyId="";
        this.PopPhone="";
        this.PopEmailId="";
        this.PopName="";
        this.PopNotes="";
        this.PopCourseId="";
        this.POPUP=false;
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

getCoureseDetails()
{
  this.CourseDetailsService.getCources(this.ProgramId)
  .subscribe(cource=>{
    this.cource = cource[0]
  });
}

getAcademyDetails()
{
  this.CourseDetailsService.getAcademies(this.AcademyId)
  .subscribe(acdemy=>{
    this.academy = acdemy[0]
  });
}

inquiry()
{
  localStorage.setItem('Inquiry_AcademyId',this.AcademyId);
  this.router.navigate(['inquiry']);
}

inquiryPopUp(){
  this.POPUP = !this.POPUP;
}

}
