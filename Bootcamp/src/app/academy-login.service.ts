import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Academy} from './academy';
import {environment} from '../environments/environment';

@Injectable()
export class AcademyLoginService {
public host:string=environment.host;
  constructor(private http:Http) { }

  authenticateAcademy(academy){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.host+'/api/authenticateAcademy',academy,{headers:headers})
    .map(res=>res.json());
  }

sendOtp(email,otp){
  return this.http.get(this.host+'/api/otpverify/'+email+'/'+otp)
  .map(res=>res.json());
}

updateVerification(email){
  return this.http.get(this.host+'/api/verifyUpdate/'+email)
  .map(res=>res.json());
}
}
