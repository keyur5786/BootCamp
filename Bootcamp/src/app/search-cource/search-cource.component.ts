import { Component, OnInit } from '@angular/core';
import {SearchCourceService} from '../search-cource.service';
import {SearchCource} from '../searchCource';
import {InquiryService} from '../inquiry.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-search-cource',
  templateUrl: './search-cource.component.html',
  styleUrls: ['./search-cource.component.css'],
  providers: [SearchCourceService,FlashMessagesService,InquiryService]
})
export class SearchCourceComponent implements OnInit {

  constructor(private InquiryService:InquiryService,private SearchCourceService:SearchCourceService,private route: ActivatedRoute,private router: Router,private flashMessage:FlashMessagesService) { }

  SearchData:SearchCource[]=[];
  txtProgramName:string;
  txtProgramType:string;
  txtLocation:string;
  sub:any;
  POPUP:boolean=false;

  PopAcademyId:any=localStorage.getItem('Inquiry_AcademyId');
  PopCourseId:any=localStorage.getItem('Inquiry_CourseId');
  PopPhone:any;
  PopEmailId:any;
  PopName:any;
  PopNotes:any;
  ngOnInit() {

 this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.txtProgramName = params['programName'] || "null";
        this.txtProgramType = params['programType'] || "null";
        this.txtLocation = params['location'] || "null";
      });
      this.GetSearchData();
  }

  inquiryPopUp(){
    this.POPUP = !this.POPUP;
  }
  onInquiry(){
    alert("Inquiry Method !");
    const newInquiry = {
      AcademyId : this.PopAcademyId,
      CourseId : this.PopCourseId,
      Phone : this.PopPhone,
      EmailId : this.PopEmailId,
      Name : this.PopName,
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


  GetSearchData(){
    this.SearchCourceService.GetSearchCourses(this.txtProgramName,this.txtProgramType,this.txtLocation)
          .subscribe(SearchData=>
            this.SearchData = SearchData);
  }

  ShowDetails(courseId,academyId){
    localStorage.setItem('Inquiry_AcademyId',academyId);
    localStorage.setItem('Inquiry_CourseId',courseId);
    //this.router.navigate(['CourseDetails'], { queryParams: { programId: programId || null,academyId:academyId || null } });
    this.router.navigate(['CourseDetails']);
  }

  DirectInquiry(academyId,courseId){
  localStorage.setItem('Inquiry_AcademyId',academyId);
  localStorage.setItem('Inquiry_CourseId',courseId);
  this.PopAcademyId = localStorage.getItem("Inquiry_AcademyId");
  this.PopCourseId = localStorage.getItem("Inquiry_CourseId");
  // this.router.navigate(['inquiry']);
  this.POPUP = true;
  }

}
