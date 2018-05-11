import { Component, OnInit } from '@angular/core';
import {LocationService} from '../location.service';
import { Location } from '../Location';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [LocationService,FlashMessagesService]
})
export class LocationComponent implements OnInit {
  locations:Location[]=[];
  location:Location;
  Loc_name:string;
  toggleForm:boolean=false;

  constructor(private LocationService:LocationService,private flashMessage:FlashMessagesService,private router:Router) { }

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
     this.LocationService.deletelocate(id)
   .subscribe(data=>{
      if(data.n==1)
      {
       for(var i=0; i<location.length;i++)
       {
          if(location[i]._id==id)
          {
           location.splice(i,1);
          }
       }
     }
  this.LocationService.getLocates()
       .subscribe(locate=>
         this.locations = locate);
       })
   }

  addLocate(){
    const newLocate = {
      Loc_name:this.Loc_name,
      CreatedBy:localStorage.getItem("LoggerId")
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
  let newLocate:Location={
    _id: this.location._id,
  Loc_name: form.value.Loc_name,
  UpdatedOn:moment().format('DD/MM/YYYY HH:MM:SS'),
  UpdatedBy:localStorage.getItem("LoggerId")
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
      this.router.navigate(['admin']);
    }
    this.LocationService.getLocates()
    .subscribe(locates=>{
      this.locations = locates;
      this.Loc_name = "";
      this.toggleForm=false;
    });
  }

}
