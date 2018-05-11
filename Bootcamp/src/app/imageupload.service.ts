import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Image} from './Imageupload';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ImageuploadService {

  constructor(private http:Http) { }



  uploadMediaFile(file): Observable<any> {
    
    return this.http.post('http://localhost:3000/api/imageupload/', file)
      .map(res => res.json())
  }

}
