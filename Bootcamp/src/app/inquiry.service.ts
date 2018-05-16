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

getInquiries(){
  return this.http.get('http://localhost:3000/api/InquiryList')
  .map(res=>res.json());
}

getInquiries1(academyID){
  return this.http.get('http://localhost:3000/api/InquiryList1/'+academyID)
  .map(res=>res.json());
}

getActivity(){
  return this.http.get('http://localhost:3000/api/Getactivity/')
  .map(res=>res.json());
}

}
