

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

  addUser(newUser){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Users',newUser,{headers:headers})
  .map(res=>res.json());
}

deleteuser(id){
  return this.http.delete('http://localhost:3000/api/Users/'+id)
  .map(res=>res.json());
}
updateUser(newUser){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/Users/'+newUser._id,newUser,{headers:headers})
   .map(res => res.json());
 }

}
