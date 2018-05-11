import { Component, OnInit } from '@angular/core';
import {ImageuploadService} from '../imageupload.service';
import { Image } from '../Imageupload';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
  providers: [ImageuploadService]
})
export class ImageuploadComponent implements OnInit {

  constructor(
    private ImageuploadService:ImageuploadService  ) { }

     files:any;

  ngOnInit() {
  }

    fileChange(event) {
      if (event.target.files.length > 0) {
        this.files=event.target.files;
      }
    }

    UploadImage(){
      if (this.files.length > 0) {
        let formData: FormData = new FormData();

        formData.append('file', this.files[0]);

        this.ImageuploadService.uploadMediaFile(formData).subscribe(
          data => {
            if (data.success) {
              console.log('File Uploaded!');
            }
          },
          err => {
            console.log(err);
            return false;
          }
        );
      }
    }
}
