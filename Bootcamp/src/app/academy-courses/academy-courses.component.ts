import { Component, OnInit } from '@angular/core';
import {AcademyCourseService} from '../academy-course.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-academy-courses',
  templateUrl: './academy-courses.component.html',
  styleUrls: ['./academy-courses.component.css'],
  providers: [AcademyCourseService]
})
export class AcademyCoursesComponent implements OnInit {
  Courses:any;
  academyId:any=localStorage.getItem('AcademyID');
  constructor(private AcademyCourseService:AcademyCourseService, private router:Router) { }

  ngOnInit() {
    var checkLogin = localStorage.getItem("AcademyID");
    if(checkLogin==null){
      this.router.navigate(['login']);
    }
    this.AcademyCourseService.getCourses(this.academyId)
    .subscribe(course=>
      this.Courses = course);
  }

}
