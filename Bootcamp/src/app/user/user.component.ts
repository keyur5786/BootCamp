
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { User } from '../user';
import { UserRights } from '../user';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {LoginServiceService} from '../login-service.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService,FlashMessagesService,LoginServiceService]
})
export class UserComponent implements OnInit {
  users:User[]=[];
  UserRights:any;

  user:User;
  singleRights:any;

  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  toggleForm:boolean=false;

  myRights:any;
  userAdd:boolean=false;
  userEdit:boolean=false;
  userDelete:boolean=false;
  constructor(private LoginServiceService:LoginServiceService,private UserService:UserService, private router:Router,private flashMessage:FlashMessagesService) { }

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
      this.router.navigate(['']);
    }

    this.LoginServiceService.GetRightsListByUserId(localStorage.getItem('LoggerId'))
    .subscribe(data=>{
      this.myRights=data;
      for (let i = 0; i < this.myRights.length; i++) {
          if(this.myRights[i].FormName == "User")
          {
            if(this.myRights[i].View == false)
            {
              //this.router.navigate(['adminHome']);
              //return false;
            }
            if(this.myRights[i].Add == true){
              this.userAdd = true;
            }
            if(this.myRights[i].Edit==true){
              this.userEdit = true;
            }
            if(this.myRights[i].Delete==true){
              this.userDelete = true;
            }
          }
        }
        this.UserService.getUsers()
        .subscribe(users=>{
            this.users = users;
            this.FirstName = "";
            this.LastName = "";
            this.UserName = "";
            this.Password = "";
            this.toggleForm=false;
            this.UserService.getUsersRights()
            .subscribe(rights=>{
              this.UserRights=rights;
            })
        });
      });
  }

  deleteuser(id:any,user:any){
    if(!confirm("Are You Sure To Delete "+user+" ?")){
      return false;
    }
     var users = this.users;
     var UserId = localStorage.getItem("LoggerId");
     var UserName = localStorage.getItem("LoggerName");
     this.UserService.deleteuser(id,UserId,UserName)
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
      CreatedBy : localStorage.getItem("LoggerId"),
      CreatedOn :moment().format("DD-MM-YYYY HH:mm:ss")
    }

    var rightsList=this.UserRights;
    var list=[];
    list.push({newUser},{rightsList});

    this.UserService.addUser(list).subscribe(result=>{
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
     console.log(form.value);
  let newUser={
    _id: this.user._id,
    FirstName: form.value.FirstName,
    LastName: form.value.LastName,
    UserName: form.value.UserName,
    Password: form.value.Password,
    UpdatedOn:moment().format('DD/MM/YYYY HH:mm:ss'),
    UpdatedBy: localStorage.getItem("LoggerId"),
    ByUser : localStorage.getItem("LoggerName")
  }
  this.UserService.updateUser(newUser)
  .subscribe(result=>{
    if(result.success){
      var rightsArray=[];
      for(var i=0;i<this.singleRights.length;i++){
        var r="rightsID_"+i;
        var a="add_"+i;
        var e="edit_"+i;
        var d="delete_"+i;
        var v="view_"+i;
       rightsArray.push({id:form.value[r],add:form.value[a],edit:form.value[e],delete:form.value[d],view:form.value[v],UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
       UpdatedBy: localStorage.getItem("LoggerId")});
      }
      console.log("My Rights Array = "+JSON.stringify(rightsArray));
      this.UserService.updateRights(rightsArray)
      .subscribe(result=>{
        this.flashMessage.show(result.success,{cssClass:'alert-success',timeout:3000});
        this.ngOnInit();
      });
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

checkAll(){
  for(var i=0;i<this.UserRights.length;i++){
    this.UserRights[i].Add = !this.UserRights[i].Add;
    this.UserRights[i].Edit = !this.UserRights[i].Edit;
    this.UserRights[i].Delete = !this.UserRights[i].Delete;
    this.UserRights[i].View = !this.UserRights[i].View;
  }
}

  showEditForm(userId){
    this.UserService.getUserDetail(userId)
    .subscribe(user=>{
    // console.log("User Data = "+JSON.stringify(user));
    this.user = user[0][0];
    this.singleRights = user[1];
    // console.log("Rights = "+JSON.stringify(this.singleRights));
    this.toggleForm = true;
      //console.log("Data From DataService : "+ this.shoppingItemList[0].itemName);
    });
  //this.user= user;
  }

  activateUser(userId,userName){
    if(!confirm("Are You Sure To Activate "+userName+" ?")){
      return false;
    }
    const userObject = {
      userId: userId,
      UpdatedBy:localStorage.getItem("LoggerId"),
      UserName:localStorage.getItem("LoggerName")
    };
    this.UserService.activateUser(userObject)
    .subscribe(user=>{
      this.flashMessage.show(user.success,{cssClass:'alert-success',timeout:3000});
      this.ngOnInit();
    });
  }

  deactivateUser(userId,userName){
    if(!confirm("Are You Sure To Dectivate "+userName+" ?")){
      return false;
    }
    const userObject = {
      userId: userId,
      UpdatedBy:localStorage.getItem("LoggerId"),
      UserName:localStorage.getItem("LoggerName")
    };
    this.UserService.deactivateUser(userObject)
    .subscribe(user=>{
      this.flashMessage.show(user.success,{cssClass:'alert-success',timeout:3000});
      this.ngOnInit();
    });
  }

}
