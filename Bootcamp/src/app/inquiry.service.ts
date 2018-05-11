import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Inquiry} from './inquiry';
import 'rxjs/add/operator/map';
@Injectable()
export class InquiryService {

  constructor(private http:Http) { }

  inquiry(newInquiry){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Inquiry',newInquiry,{headers:headers})
  .map(res=>res.json());
}

}
