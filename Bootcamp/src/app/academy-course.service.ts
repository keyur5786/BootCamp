import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AcademyCourseService {

  constructor(private http:Http) { }
  getCourses(academyID){
    return this.http.get('http://localhost:3000/api/academyCourses/'+academyID)
    .map(res=>res.json());
  }
}
