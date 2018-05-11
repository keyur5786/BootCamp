
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { User } from '../user';
import { UserRights } from '../user';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService,FlashMessagesService]
})
export class UserComponent implements OnInit {
  users:User[]=[];
  UserRights:UserRights[]=[];
  user:User;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  toggleForm:boolean=false;
  constructor(private UserService:UserService, private router:Router,private flashMessage:FlashMessagesService) { }

  getUsers(){
    this.UserService.getUsers()
    .subscribe(user=>{
      this.users = user,
      this.FirstName = "",
      this.LastName = "",
      this.UserName = "",
      this.Password = ""
      //console.log("Data From DataService : "+ this.shoppingItemList[0].itemName);
    });
  }

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['admin']);
    }
    console.log("checkLogin = "+checkLogin);
    this.UserService.getUsers()
    .subscribe(users=>{
        this.users = users;
        this.FirstName = "";
        this.LastName = "";
        this.UserName = "";
        this.Password = "";
        this.toggleForm=false;
    });
  }

  deleteuser(id:any,user:any){
    if(!confirm("Are You Sure To Delete "+user+" ?")){
      return false;
    }
     var users = this.users;
     this.UserService.deleteuser(id)
   .subscribe(data=>{
      if(data.n==1){
       for(var i=0; i<users.length;i++){
          if(users[i]._id==id){
           users.splice(i,1);
         }
       }

     }
 this.UserService.getUsers()
       .subscribe(users=>
         this.users = users);})
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
      CreatedBy : localStorage.getItem("LoggerId")
    }
    this.UserService.addUser(newUser).subscribe(result=>{
      if(result.success){
        this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:5000});
        this.ngOnInit();
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

  editUser(form){
  let newUser:User={
    _id: this.user._id,
    FirstName: form.value.FirstName,
    LastName: form.value.LastName,
    UserName: form.value.UserName,
    Password: form.value.Password,
    UpdatedOn:moment().format('DD/MM/YYYY HH:MM:SS'),
    UpdatedBy: localStorage.getItem("LoggerId")
  }
  this.UserService.updateUser(newUser)
  .subscribe(result=>{
    if(result.success){
      this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
      this.ngOnInit();
    }else{
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

  showEditForm(user){
  this.user= user;
  this.toggleForm = true;
  }



}
