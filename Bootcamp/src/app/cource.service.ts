import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Cource} from './cource';
import 'rxjs/add/operator/map';

@Injectable()
export class CourceService {

  constructor(private http:Http) { }

  getCources(){

    return this.http.get('http://localhost:3000/api/cources')
    .map(res=>res.json());
  }

  getMyCources(academyId){
    return this.http.get('http://localhost:3000/api/MyCources/'+academyId)
    .map(res=>res.json());
  }

  deletecource(id,UserId,UserName,UserType){
    return this.http.delete('http://localhost:3000/api/Cources/'+id+"/"+UserId+"/"+UserName+"/"+UserType)
    .map(res=>res.json());
  }

  addCource(newCource){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Cources',newCource,{headers:headers})
  .map(res=>res.json());
}

updateCource(newCource){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/Cources/'+newCource._id,newCource,{headers:headers})
   .map(res => res.json());
 }

 changeStatus(statusRecordId,statusId,academyid,createdBy,UserType,UserName){
   console.log("From Service = CreatedBy "+createdBy);
   return this.http.get('http://localhost:3000/api/changeStatus/'+statusRecordId+"/"+statusId+"/"+academyid+"/"+createdBy+"/"+UserType+"/"+UserName)
   .map(res=>res.json());
 }

 activateCourse(courseObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/activateCourse',courseObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateCourse(courseObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/deactivateCourse',courseObject,{headers:headers})
   .map(res=>res.json());
 }

}
