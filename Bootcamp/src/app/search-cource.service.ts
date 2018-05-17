import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {SearchCource} from './searchCource';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class SearchCourceService {
public host:string=environment.host;
  constructor(private http:Http) { }

  GetSearchCourses(ProgramName,ProgramType,location){
    //console.log(ProgramName,ProgramType,location);
    return this.http.get(this.host+'/api/SearchCourse/'+ProgramName+'/'+ProgramType+'/'+location)
    .map(res=>res.json());
  }

}
