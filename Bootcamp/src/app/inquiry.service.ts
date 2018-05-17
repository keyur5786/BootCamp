import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Inquiry} from './inquiry';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class InquiryService {
public host:string=environment.host;
  constructor(private http:Http) { }

  inquiry(newInquiry){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.host+'/api/Inquiry',newInquiry,{headers:headers})
  .map(res=>res.json());
}

getInquiries(){
  return this.http.get(this.host+'/api/InquiryList')
  .map(res=>res.json());
}

getInquiries1(academyID){
  return this.http.get(this.host+'/api/InquiryList1/'+academyID)
  .map(res=>res.json());
}

getActivity(){
  return this.http.get(this.host+'/api/Getactivity/')
  .map(res=>res.json());
}

}
