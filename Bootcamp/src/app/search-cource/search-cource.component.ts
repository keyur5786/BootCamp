import { Component, OnInit } from '@angular/core';
import {SearchCourceService} from '../search-cource.service';
import {SearchCource} from '../searchCource';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-cource',
  templateUrl: './search-cource.component.html',
  styleUrls: ['./search-cource.component.css'],
  providers: [SearchCourceService]
})
export class SearchCourceComponent implements OnInit {

  constructor(private SearchCourceService:SearchCourceService,private route: ActivatedRoute,private router: Router) { }

  SearchData:SearchCource[]=[];
  txtProgramName:string;
  txtProgramType:string;
  txtLocation:string;
  sub:any;
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

  GetSearchData(){
    this.SearchCourceService.GetSearchCourses(this.txtProgramName,this.txtProgramType,this.txtLocation)
          .subscribe(SearchData=>
            this.SearchData = SearchData);
  }

  ShowDetails(programId,academyId){
    this.router.navigate(['/CourseDetails'], { queryParams: { programId: programId || null,academyId:academyId || null } });
  }
  DirectInquiry(programId,academyId){
  localStorage.setItem('Inquiry_AcademyId',academyId);
  this.router.navigate(['inquiry']);
  }
}
