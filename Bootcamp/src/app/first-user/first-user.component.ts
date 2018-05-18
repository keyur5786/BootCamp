import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { UserRights } from '../user';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-first-user',
  templateUrl: './first-user.component.html',
  styleUrls: ['./first-user.component.css'],
  providers: [UserService,FlashMessagesService]
})
export class FirstUserComponent implements OnInit {
  UserRights:any;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  constructor(private router:Router,private UserService:UserService,private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    if(sessionStorage.getItem("firstUser")!="Yes"){
      this.router.navigate(['']);
    }
    this.UserService.getUsers()
    .subscribe(users=>{
        this.FirstName = "";
        this.LastName = "";
        this.UserName = "";
        this.Password = "";
        this.UserService.getUsersRights()
        .subscribe(rights=>{
          for(var i=0;i<rights.length;i++){
            rights[i].Add = !rights[i].Add;
            rights[i].Edit = !rights[i].Edit;
            rights[i].Delete = !rights[i].Delete;
            rights[i].View = !rights[i].View;
          }
          this.UserRights=rights;
        })
    });
  }

  addUser(){
    if(/.* .*/.test(this.UserName)){
      this.flashMessage.show("User Name Should Not Contain Space !",{cssClass:'alert-danger',timeout:5000});
      return false;
    }
    const newUser = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      UserName: this.UserName,
      Password: this.Password,
      CreatedBy : "By Self",
      CreatedOn :moment().format("DD-MM-YYYY HH:mm:ss")
    }

    var rightsList=this.UserRights;
    var list=[];
    list.push({newUser},{rightsList});

    this.UserService.addUser(list).subscribe(result=>{
      if(result.success){
        this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:5000});
        this.router.navigate(['admin']);
      }
      else{
        if(result.defaultError){
          this.flashMessage.show(result.defaultError,{cssClass:'alert-danger',timeout:5000});
          return false;
        }
        var messageArray = result.error.split(":");
        var error = messageArray[2].replace(/!.*/,"!");
        this.flashMessage.show(error,{cssClass:'alert-danger',timeout:5000});
      }
    });
    }

}
