import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Location} from './Location';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http:Http) { }

  getLocates(){
    return this.http.get('http://localhost:3000/api/locates')
    .map(res=>res.json());
  }



  addLocate(newLocate){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/Locates',newLocate,{headers:headers})
  .map(res=>res.json());
}

deletelocate(id,UserId,UserName){
  return this.http.delete('http://localhost:3000/api/Locates/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}

updateLocate(newLocate){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/Locates/'+newLocate._id,newLocate,{headers:headers})
   .map(res => res.json());
 }

 activateLocation(locationObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/activateLocation',locationObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateLocation(locationObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put('http://localhost:3000/api/deactivateLocation',locationObject,{headers:headers})
   .map(res=>res.json());
 }
}
