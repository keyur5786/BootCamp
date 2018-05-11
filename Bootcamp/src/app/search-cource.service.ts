import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {SearchCource} from './searchCource';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchCourceService {

  constructor(private http:Http) { }

  GetSearchCourses(ProgramName,ProgramType,location){
    //console.log(ProgramName,ProgramType,location);
    return this.http.get('http://localhost:3000/api/SearchCourse/'+ProgramName+'/'+ProgramType+'/'+location)
    .map(res=>res.json());
  }

}
