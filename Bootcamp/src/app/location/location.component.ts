import { Component, OnInit } from '@angular/core';
import {LocationService} from '../location.service';
import { Location } from '../Location';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {LoginServiceService} from '../login-service.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [LocationService,FlashMessagesService,LoginServiceService]
})
export class LocationComponent implements OnInit {
  locations:Location[]=[];
  location:Location;
  Loc_name:string;
  toggleForm:boolean=false;

  UserRights:any;
  locationAdd:boolean=false;
  locationEdit:boolean=false;
  locationDelete:boolean=false;

  constructor(private LocationService:LocationService,private LoginServiceService:LoginServiceService,private flashMessage:FlashMessagesService,private router:Router) { }

  getLocates(){
    this.LocationService.getLocates()
    .subscribe(locates=>{
      this.locations = locates,
      this.Loc_name=""
    });
  }

  deletelocate(id:any,locationName:any){
    if(!confirm("Are You Sure To Delete "+locationName+" ?")){
      return false;
    }
    var location=this.locations;
    var UserId = localStorage.getItem("LoggerId");
    var UserName = localStorage.getItem("LoggerName");
     this.LocationService.deletelocate(id,UserId,UserName)
   .subscribe(data=>{
      if(data.msg)
      {
       for(var i=0; i<location.length;i++)
       {
          if(location[i]._id==id)
          {
           location.splice(i,1);
          }
       }
     }else{
       this.flashMessage.show(data.defaultError,{cssClass:'alert-danger',timeout:3000});
       return false;
     }
  this.LocationService.getLocates()
       .subscribe(locate=>
         this.locations = locate);
       })
   }

  addLocate(){
    const newLocate = {
      Loc_name:this.Loc_name,
      CreatedBy:localStorage.getItem("LoggerId"),
      CreatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
      UserType: "Admin",
      UserName:localStorage.getItem("LoggerName")
    }
    console.log(newLocate);
    this.LocationService.addLocate(newLocate).subscribe(result=>{
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


  showEditForm(locate){
    this.location= locate;
    this.toggleForm = true;
    }

editLocate(form){
  let newLocate={
    _id: this.location._id,
  Loc_name: form.value.Loc_name,
  UpdatedOn:moment().format("DD-MM-YYYY HH:mm:ss"),
  UpdatedBy:localStorage.getItem("LoggerId"),
  UserName:localStorage.getItem("LoggerName")
  }
  this.LocationService.updateLocate(newLocate)
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

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['']);
    }

    this.LoginServiceService.GetRightsListByUserId(localStorage.getItem('LoggerId'))
    .subscribe(data=>{
      this.UserRights=data;
      for (let i = 0; i < this.UserRights.length; i++) {
          if(this.UserRights[i].FormName == "Location")
          {
            if(this.UserRights[i].View == false)
            {
              this.router.navigate(['adminHome']);
              return false;
            }
            if(this.UserRights[i].Add == true){
              this.locationAdd = true;
            }
            if(this.UserRights[i].Edit==true){
              this.locationEdit = true;
            }
            if(this.UserRights[i].Delete==true){
              this.locationDelete = true;
            }
            this.LocationService.getLocates()
            .subscribe(locates=>{
              this.locations = locates;
              this.Loc_name = "";
              this.toggleForm=false;
            });
          }
        }
      });
  }

  activateLocation(locationId,locationName){
    if(!confirm("Are You Sure To Activate "+locationName+" ?")){
      return false;
    }
    const locationObject = {
      locationId: locationId,
      UpdatedBy:localStorage.getItem("LoggerId"),
      UserName:localStorage.getItem("LoggerName")
    };
    this.LocationService.activateLocation(locationObject)
    .subscribe(location=>{
      this.flashMessage.show(location.success,{cssClass:'alert-success',timeout:3000});
      this.ngOnInit();
    });
  }

  deactivateLocation(locationId,locationName){
    if(!confirm("Are You Sure To Dectivate "+locationName+" ?")){
      return false;
    }
    const locationObject = {
      locationId: locationId,
      UpdatedBy:localStorage.getItem("LoggerId"),
      UserName:localStorage.getItem("LoggerName")
    };
    this.LocationService.deactivateLocation(locationObject)
    .subscribe(location=>{
      this.flashMessage.show(location.success,{cssClass:'alert-success',timeout:3000});
      this.ngOnInit();
    });
  }

}
