import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Register} from './register';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  addAcademy(newAcademy){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Registers',newAcademy,{headers:headers})
  .map(res=>res.json());
}

registerAcademy(Academy){
let headers = new Headers();
headers.append('Content-Type','application/json');
return this.http.put('http://localhost:3000/api/RegisterAcademy',Academy,{headers:headers})
.map(res=>res.json());
}

uploadMediaFileR(file): Observable<any> {
  console.log("sercive");
console.log(file);
  return this.http.post('http://localhost:3000/api/imageuploadR/',file)
    .map(res => res.json())
}

// for acdemy profile update
getAcademy(AcademyId){
  return this.http.get('http://localhost:3000/api/getAcademyProfile/'+AcademyId)
  .map(res=>res.json());
}

 Updateprofile(Academy){
  let headers = new Headers();
 headers.append('Content-Type','application/json');
  return this.http.put('http://localhost:3000/api/updateprofile',Academy,{headers:headers})
 .map(res=>res.json());
 }

 uploadMediaFileU(file): Observable<any> {
   console.log("sercive");
 console.log(file);
   return this.http.post('http://localhost:3000/api/imageuploadU/',file)
     .map(res => res.json())
 }
}
