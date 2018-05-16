import { Component, OnInit } from '@angular/core';
import {InquiryService} from '../inquiry.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-academy-inquiry-list',
  templateUrl: './academy-inquiry-list.component.html',
  styleUrls: ['./academy-inquiry-list.component.css'],
  providers: [InquiryService,FlashMessagesService]
})
export class AcademyInquiryListComponent implements OnInit {
  Inquiry:any;
  constructor(private InquiryService:InquiryService,
    private flashMessage:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("AcademyID")==null){
      this.router.navigate(['']);
    }
    this.InquiryService.getInquiries1(localStorage.getItem("AcademyID"))
    .subscribe(inquiry=>{
      for(var i=0;i<inquiry.length;i++){
        // if(inquiry[i].AcademyId==null){
        //   inquiry[i]['TempAcademy'] = "None";
        // }else{
        //   inquiry[i]['TempAcademy'] = inquiry[i].AcademyId.AcademyName;
        // }
        //
        // if(inquiry[i].CourseId==null){
        //   inquiry[i]['TempCourse'] = "None";
        // }else{
        //   inquiry[i]['TempCourse'] = inquiry[i].CourseId.ProgramName;
        // }
        inquiry[i]['TempAcademy'] = inquiry[i].AcademyId.AcademyName;
        inquiry[i]['TempCourse'] = inquiry[i].CourseId.ProgramName;
      }
      this.Inquiry = inquiry;
    });
  }

}
