import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BootcampService} from '../bootcamp.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.css'],
  providers:[BootcampService]
})
export class BootcampComponent implements OnInit {
    locate:any;
    txtProgramName:string;
    txtProgramType:any="";
    ProgramTypeArray:any=[{id:'1',name:'Front End Web Application Development'},{id:'2',name:'Full Stack Applicationd Development'},{id:'3',name:'User Experience Design'}];
    txtLocation:string;
    locations:any;
    cources:any;
  constructor(private BootcampService:BootcampService,private router: Router) { }
   ngOnInit(){
     this.BootcampService.getData()
     .subscribe(data=>{
       localStorage.clear();
       this.cources = data[0];
       this.locations = data[2];
     });
   }

  GoForSearch() {
          //this.router.navigate('/searchCourse',);
          this.router.navigate(['/searchCourse'], { queryParams: { programType: this.txtProgramType || "",programName:this.txtProgramName || "",location:this.txtLocation||"" } });
  }

  }
