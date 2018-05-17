

import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class UserService {
public host:string=environment.host;
  constructor(private http:Http) { }

  getUsers(){
    return this.http.get(this.host+'/api/users')
    .map(res=>res.json());
  }

  getUsersRights(){
    return this.http.get(this.host+'/api/GetRightsList')
    .map(res=>res.json());
  }

  addUser(list){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.host+'/api/Users',list,{headers:headers})
  .map(res=>res.json());
}

deleteuser(id,UserId,UserName){
  return this.http.delete(this.host+'/api/Users/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}
updateUser(newUser){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/Users/'+newUser._id,newUser,{headers:headers})
   .map(res => res.json());
 }

 getUserDetail(UserId){
   return this.http.get(this.host+'/api/getUserDetail/'+UserId)
   .map(res=>res.json());
 }

 updateRights(rightsArray){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/updateRights',rightsArray,{headers:headers})
   .map(res => res.json());
 }

 activateUser(userObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/activateUser',userObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateUser(userObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/deactivateUser',userObject,{headers:headers})
   .map(res=>res.json());
 }

}
