import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Academy} from './academy';

@Injectable()
export class AcademyLoginService {

  constructor(private http:Http) { }

  authenticateAcademy(academy){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/authenticateAcademy',academy,{headers:headers})
    .map(res=>res.json());
  }

}
