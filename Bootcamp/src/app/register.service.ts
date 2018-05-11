import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Register} from './register';
import 'rxjs/add/operator/map';

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

}
