import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Bootcamp} from './bootcamp';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class BootcampService {
 // endPoint: string;
  constructor(private http:Http) {
  // this.endPoint = "http://localhost:3000/api/Locates";
 }

 getData(){
   return this.http.get('http://localhost:3000/api/cources')
   .map(res=>res.json());
 }

  // search(term: string): Observable<any[]> {
  //         var Loc_List = this.http.get(this.endPoint + '?term=' + term)
  //             .map((r: Response) => { return (r.json().length != 0 ? r.json() : [{ "_Id": 0, "Loc_name": "No Record Found" }]) as any[] });
  //         return Loc_List;
  //     }
}
