

import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUsers(){
    return this.http.get('http://localhost:3000/api/users')
    .map(res=>res.json());
  }

  getUsersRights(){
    return this.http.get('http://localhost:3000/api/GetRightsList')
    .map(res=>res.json());
  }

  addUser(list){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Users',list,{headers:headers})
  .map(res=>res.json());
}

deleteuser(id,UserId,UserName){
  return this.http.delete('http://localhost:3000/api/Users/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}
updateUser(newUser){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/Users/'+newUser._id,newUser,{headers:headers})
   .map(res => res.json());
 }

 getUserDetail(UserId){
   return this.http.get('http://localhost:3000/api/getUserDetail/'+UserId)
   .map(res=>res.json());
 }

 updateRights(rightsArray){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/updateRights',rightsArray,{headers:headers})
   .map(res => res.json());
 }

 activateUser(userObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/activateUser',userObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateUser(userObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/deactivateUser',userObject,{headers:headers})
   .map(res=>res.json());
 }

}
