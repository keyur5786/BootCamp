import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Academy} from './academy';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment';

@Injectable()
export class AcademyService {
public host:string=environment.host;
  constructor(private http:Http) {
  }

  getAcademy(){
    return this.http.get(this.host+'/api/academies')
    .map(res=>res.json());
  }

  addAcademy(newAcademy) {
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.host+'/api/academy',newAcademy,{headers:headers})
  .map(res=>res.json());
}

uploadMediaFile(file): Observable<any> {
console.log(file);
  return this.http.post(this.host+'/api/imageupload/',file)
    .map(res => res.json())
}
uploadMediaFileE(file): Observable<any> {
console.log(file);
  return this.http.post(this.host+'/api/imageuploadE/',file)
    .map(res => res.json())
}

deleteAcademy(id,UserId,UserName){
  return this.http.delete(this.host+'/api/academy/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}

updateAcademy(newAcademy){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/academy/'+newAcademy._id,newAcademy,{headers:headers})
   .map(res => res.json());
 }

 activateAcademy(academyObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/activateAcademy',academyObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateAcademy(academyObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/deactivateAcademy',academyObject,{headers:headers})
   .map(res=>res.json());
 }

}
