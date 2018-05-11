import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseDetailsService {

  constructor(private http:Http) { }
  getCources(programId){
    return this.http.get('http://localhost:3000/api/cources/'+programId)
    .map(res=>res.json());
  }

  getAcademies(AcademyId){
    return this.http.get('http://localhost:3000/api/academy/'+AcademyId)
    .map(res=>res.json());
  }
}
