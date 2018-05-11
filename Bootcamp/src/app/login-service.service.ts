import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from './user';

@Injectable()
export class LoginServiceService {
  userName:any;
  constructor(private http:Http) { }

  authenticateUser(user){
    console.log("from service = "+user.UserName);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/authenticate/'+user.UserName+'/'+user.Password,{headers:headers})
    .map(res=>res.json());
  }

  storeUserData(userName){
    localStorage.setItem('id_token',JSON.stringify(userName));
    this.userName = userName;
  }

}
