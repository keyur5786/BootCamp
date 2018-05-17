import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

@Injectable()
export class CourseDetailsService {
public host:string=environment.host;
  constructor(private http:Http) { }
  getCources(programId){
    return this.http.get(this.host+'/api/cources/'+programId)
    .map(res=>res.json());
  }

  getAcademies(AcademyId){
    return this.http.get(this.host+'/api/academy/'+AcademyId)
    .map(res=>res.json());
  }
}
