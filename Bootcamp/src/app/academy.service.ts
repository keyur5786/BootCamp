import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Academy} from './academy';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AcademyService {

  constructor(private http:Http) {
  }

  getAcademy(){
    return this.http.get('http://localhost:3000/api/academies')
    .map(res=>res.json());
  }

  addAcademy(newAcademy) {
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/academy',newAcademy,{headers:headers})
  .map(res=>res.json());
}

uploadMediaFile(file): Observable<any> {
console.log(file);
  return this.http.post('http://localhost:3000/api/imageupload/',file)
    .map(res => res.json())
}
uploadMediaFileE(file): Observable<any> {
console.log(file);
  return this.http.post('http://localhost:3000/api/imageuploadE/',file)
    .map(res => res.json())
}

deleteAcademy(id,UserId,UserName){
  return this.http.delete('http://localhost:3000/api/academy/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}

updateAcademy(newAcademy){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/academy/'+newAcademy._id,newAcademy,{headers:headers})
   .map(res => res.json());
 }

 activateAcademy(academyObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/activateAcademy',academyObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateAcademy(academyObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/deactivateAcademy',academyObject,{headers:headers})
   .map(res=>res.json());
 }

}
