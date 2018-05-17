import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Image} from './Imageupload';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {environment} from '../environments/environment';
@Injectable()
export class ImageuploadService {
public host:string=environment.host;
  constructor(private http:Http) { }



  uploadMediaFile(file): Observable<any> {

    return this.http.post(this.host+'/api/imageupload/', file)
      .map(res => res.json())
  }

}
