import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class AcademyCourseService {
  public host:string=environment.host;
  constructor(private http:Http) { }
  getCourses(academyID){
    return this.http.get(this.host+'/api/academyCourses/'+academyID)
    .map(res=>res.json());
  }
}
