import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {Image} from './image';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {

  constructor(private http:Http) { }

//   getImages(){
//     return this.http.get('http://localhost:3000/api/images')
//     .map(res=>res.json());
//   }
//
//   addImage(newImage){
//     console.log("From Service = "+newImage.upload);
//   let headers = new Headers();
//   headers.append('Content-Type','application/json');
//   return this.http.post('http://localhost:3000/api/image',newImage,{headers:headers})
//   .map(res=>res.json());
// }
//
// deleteImage(id){
//   return this.http.delete('http://localhost:3000/api/images/'+id)
//   .map(res=>res.json());
// }
//
// updateImage(newImage){
//    let headers = new Headers();
//    headers.append('Content-Type','application/json, multipart/form-data');
//    return this.http.put('http://localhost:3000/api/images/'+newImage._id,newImage,{headers:headers})
//    .map(res => res.json());
//  }

}
