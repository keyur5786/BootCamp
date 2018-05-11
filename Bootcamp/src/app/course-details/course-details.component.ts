import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CourseDetailsService} from '../course-details.service';
import {Course} from '../CourseDetails';
import {Academy} from '../CourseDetails';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
    providers: [CourseDetailsService,FlashMessagesService]
})
export class CourseDetailsComponent implements OnInit {

  constructor(private CourseDetailsService:CourseDetailsService,private route: ActivatedRoute,private router: Router,private flashMessage:FlashMessagesService) { }

  academyDetail:Academy[]=[];
  cource:any;
  academy:any;
  ProgramId:string;
  AcademyId:string;
  POPUP:boolean= false;
  ngOnInit() {

    this.route
        .queryParams
        .subscribe(params => {
          // Defaults to 0 if no query param provided.
          this.ProgramId = params['programId'] || null;
          this.AcademyId = params['academyId'] || null;
        });
        console.log(this.ProgramId +"||"+this.AcademyId);
        this.getCoureseDetails();
        this.getAcademyDetails();

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
