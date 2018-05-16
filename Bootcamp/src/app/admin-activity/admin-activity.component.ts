import { Component, OnInit } from '@angular/core';
import {InquiryService} from '../inquiry.service';
import * as moment from 'moment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.css'],
  providers:[InquiryService,FlashMessagesService]
})
export class AdminActivityComponent implements OnInit {
  Activity:any;

  constructor(private InquiryService:InquiryService,
    private flashMessage:FlashMessagesService,
    private router:Router) { }

  ngOnInit() {
    var checkLogin = localStorage.getItem("LoggerId");
    if(checkLogin==null){
      this.router.navigate(['admin']);
    }
    this.InquiryService.getActivity()
    .subscribe(activity=>{
        this.Activity=activity;
    });
  }
}
