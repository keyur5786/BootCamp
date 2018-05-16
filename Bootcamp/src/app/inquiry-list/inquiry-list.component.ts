import { Component, OnInit } from '@angular/core';
import {InquiryService} from '../inquiry.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {LoginServiceService} from '../login-service.service';
@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.css'],
  providers: [InquiryService,FlashMessagesService,LoginServiceService]
})
export class InquiryListComponent implements OnInit {
  Inquiry:any;

  UserRights:any;
  inquiryAdd:boolean=false;
  inquiryEdit:boolean=false;
  inquiryDelete:boolean=false;
  constructor(private LoginServiceService:LoginServiceService,private InquiryService:InquiryService,private flashMessage:FlashMessagesService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("LoggerId")==null){
      this.router.navigate(['']);
    }

    this.LoginServiceService.GetRightsListByUserId(localStorage.getItem('LoggerId'))
    .subscribe(data=>{
      this.UserRights=data;
      for (let i = 0; i < this.UserRights.length; i++) {
          if(this.UserRights[i].FormName == "Inquiries")
          {
            if(this.UserRights[i].View == false)
            {
              this.router.navigate(['adminHome']);
              return false;
            }
            if(this.UserRights[i].Add == true){
              this.inquiryAdd = true;
            }
            if(this.UserRights[i].Edit==true){
              this.inquiryEdit = true;
            }
            if(this.UserRights[i].Delete==true){
              this.inquiryDelete = true;
            }
            this.InquiryService.getInquiries()
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

              // console.log(JSON.stringify(inquiry));
              this.Inquiry = inquiry;
            });
          }
        }
      });
  }

}
