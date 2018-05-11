import { Component, OnInit } from '@angular/core';
import {ImageService} from '../image.service';
import { Image } from '../image';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css'],
  providers: [ImageService,FlashMessagesService]
})
export class UploadTestComponent implements OnInit {
  images:Image[]=[];
  image:Image;
  title: string;
  upload:string;
  uploadFile: Array<File>;
  toggleForm:boolean=false;
  constructor(private ImageService:ImageService, private flashMessage:FlashMessagesService) {
    this.uploadFile = [];
  }
ngOnInit() {}
//   validateForm(data){
//     var pattern = /^[a-zA-Z][a-zA-Z0-9 ]+/
//     var validateCheck = "Validate Check";
//     if(data.title==undefined || data.upload==undefined){
//       validateCheck = "Title & Upload is required";
//     }
//     else if(!pattern.test(data.title)){
//       validateCheck = "Title is not in valid format!"
//     }
//     else{
//       validateCheck = "true";
//     }
//     return validateCheck;
//   }
//
//   getImages(){
//     this.ImageService.getImages()
//     .subscribe(image=>{
//       this.images = image;
//     });
//   }
//
//   deleteImage(id:any){
//      var images = this.images;
//      this.ImageService.deleteImage(id)
//    .subscribe(data=>{
//       if(data.n==1){
//        for(var i=0; i<images.length;i++){
//           if(images[i]._id==id){
//            images.splice(i,1);
//          }
//        }
//
//      }
//  this.ImageService.getImages()
//        .subscribe(images=>
//          this.images = images);})
//    }
//
//   addImage(){
//     const newImage = {
//       title: this.title,
//       upload: this.upload,
//       uploadFile: this.uploadFile
//     }
//     if(this.validateForm(newImage)=="true"){
//       console.log(newImage);
//       this.ImageService.addImage(newImage).subscribe(image=>{
//       this.images.push(image);
//       this.ImageService.getImages()
//       .subscribe(images=>
//       this.images = images,
//       );
//       });
//     }else{
//       this.flashMessage.show(this.validateForm(newImage),{cssClass : 'alert-danger',timeout:3000});
//       return false;
//     }
//
//
//   }
//
//   getFileDetails (fileInput:any) {
//     this.uploadFile = <Array<File>> fileInput.target.files[0];
//     this.upload = fileInput.target.files[0].name;
//     console.log(this.uploadFile);
//   // for (var i = 0; i < event.target.files.length; i++) {
//   //   var name = event.target.files[i].name;
//   //   var type = event.target.files[i].type;
//   //   var size = event.target.files[i].size;
//   //   var modifiedDate = event.target.files[i].lastModifiedDate;
//   //
//   //   console.log ('Name: ' + name + "\n" +
//   //     'Type: ' + type + "\n" +
//   //     'Last-Modified-Date: ' + modifiedDate + "\n" +
//   //     'Size: ' + Math.round(size / 1024) + " KB");
//   // }
// }
//
//
//   editImage(form){
//   let newImage:Image={
//     _id: this.image._id,
//     title: form.value.title,
//     upload: form.value.upload
//   }
//   if(this.validateForm(newImage)=="true"){
//     this.ImageService.updateImage(newImage)
//     .subscribe(result=>{
//       console.log("Image Updated Successfully "+ result);
//       this.getImages();
//     });
//     this.toggleForm=!this.toggleForm;
//   }else{
//     this.flashMessage.show(this.validateForm(newImage),{cssClass : 'alert-danger',timeout:3000});
//     return false;
//   }
// }
//
//   showEditForm(image){
//   this.image= image;
//   this.toggleForm = !this.toggleForm;
//   }
//
//   ngOnInit() {
//     this.ImageService.getImages()
//     .subscribe(images=>
//       this.images = images);
//
//         // this.loadScript('assets/js/fileModel.js');
//   }

 //  public loadScript(url) {
 //    console.log('preparing to load...');
 //    let node = document.createElement('script');
 //    node.src = url;
 //    node.type = 'text/javascript';
 //    document.getElementsByTagName('head')[0].appendChild(node);
 // }

}
