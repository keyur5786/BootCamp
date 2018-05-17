import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Location} from './Location';
import 'rxjs/add/operator/map';
import {environment} from '../environments/environment';
@Injectable()
export class LocationService {
public host:string=environment.host;
  constructor(private http:Http) { }

  getLocates(){
    return this.http.get(this.host+'/api/locates')
    .map(res=>res.json());
  }



  addLocate(newLocate){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post(this.host+'/api/Locates',newLocate,{headers:headers})
  .map(res=>res.json());
}

deletelocate(id,UserId,UserName){
  return this.http.delete(this.host+'/api/Locates/'+id+"/"+UserId+"/"+UserName)
  .map(res=>res.json());
}

updateLocate(newLocate){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/Locates/'+newLocate._id,newLocate,{headers:headers})
   .map(res => res.json());
 }

 activateLocation(locationObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/activateLocation',locationObject,{headers:headers})
   .map(res=>res.json());
 }

 deactivateLocation(locationObject){
   let headers = new Headers();
   headers.append('Content-Type','application/json');
   return this.http.put(this.host+'/api/deactivateLocation',locationObject,{headers:headers})
   .map(res=>res.json());
 }
}
