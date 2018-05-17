import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Cource} from './cource';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';

@Injectable()
export class CourceService {
public host:string=environment.host;
  constructor(private http:Http) { }

  getCources(){

    return this.http.get(this.host+'/api/cources')
    .map(res=>res.json());
  }

  getMyCources(academyId){
    return this.http.get(this.host+'/api/MyCources/'+academyId)
    .map(res=>res.json());
  }

  deletecource(id,UserId,UserName,UserType){
    return this.http.delete(this.host+'/api/Cources/'+id+"/"+UserId+"/"+UserName+"/"+UserType)
    .map(res=>res.json());
  }

  addCource(newCource){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.host+'/api/Cources',newCource,{headers:headers})
  .map(res=>res.json());
}

updateCource(newCource){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/Cources/'+newCource._id,newCource,{headers:headers})
   .map(res => res.json());
 }

 changeStatus(statusRecordId,statusId,academyid,createdBy,UserType,UserName){
   console.log("From Service = CreatedBy "+createdBy);
   return this.http.get(this.host+'/api/changeStatus/'+statusRecordId+"/"+statusId+"/"+academyid+"/"+createdBy+"/"+UserType+"/"+UserName)
   .map(res=>res.json());
 }

 activateCourse(courseObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/activateCourse',courseObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateCourse(courseObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/deactivateCourse',courseObject,{headers:headers})
   .map(res=>res.json());
 }

}
