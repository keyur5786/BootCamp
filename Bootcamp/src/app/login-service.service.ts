import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from './user';
import {environment} from '../environments/environment';

@Injectable()
export class LoginServiceService {
  userName:any;
  public host:string=environment.host;
  constructor(private http:Http) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.host+'/api/authenticate/'+user.UserName+'/'+user.Password,{headers:headers})
    .map(res=>res.json());
  }

  GetRightsListByUserId(userId){
    //console.log("from service : "+userId);
    return this.http.get(this.host+'/api/GetRightsListByUserId/'+userId)
    .map(res=>res.json());
  }

  storeUserData(userName){
    localStorage.setItem('id_token',JSON.stringify(userName));
    this.userName = userName;
  }

  logoutUser(userID,UserName){
    return this.http.get(this.host+'/api/logoutUser/'+userID+"/"+UserName)
    .map(res=>res.json());
  }

  logoutAcademy(userID,UserName){
    return this.http.get(this.host+'/api/logoutAcademy/'+userID+"/"+UserName)
    .map(res=>res.json());
  }

}
