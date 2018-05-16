import { Component, OnInit } from '@angular/core';
import {InquiryService} from '../inquiry.service';
import { Inquiry } from '../inquiry';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css'],
  providers: [InquiryService,FlashMessagesService]
})
export class InquiryComponent implements OnInit {
AcademyId:any=localStorage.getItem('Inquiry_AcademyId');
CourseId:any=localStorage.getItem('Inquiry_CourseId');
Phone:any;
EmailId:any;
Name:any;
Notes:any;

  constructor(private InquiryService:InquiryService,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onInquiry(){
    const newInquiry = {
      AcademyId : this.AcademyId,
      CourseId : this.CourseId,
      Phone : this.Phone,
      EmailId : this.EmailId,
      Name : this.Name,
      Notes : this.Notes,
    }
    this.InquiryService.inquiry(newInquiry)
    .subscribe(data=>{
      console.log("Inquiry Submited");
      this.AcademyId="";
      this.Phone="";
      this.EmailId="";
      this.Name="";
      this.Notes="";
      this.CourseId="";
    });
// this.flashMessage.show("inquries successfully submitted!!!...",{cssClass : 'alert-success',timeout:5000});
    window.history.go(-1);

  }

}
