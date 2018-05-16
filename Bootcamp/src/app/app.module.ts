import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { UserComponent } from './user/user.component';
import { AcademyComponent } from './academy/academy.component';
import { CourceComponent } from './cource/cource.component';
import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UploadTestComponent } from './upload-test/upload-test.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { LoginComponent } from './login/login.component';
import { LocationComponent } from './location/location.component';
import { BootcampComponent } from './bootcamp/bootcamp.component';
import { RegisterComponent } from './register/register.component';
import { SearchCourceComponent } from './search-cource/search-cource.component';
import { ProgramStatusComponent } from './program-status/program-status.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { AcademyRegisterComponent } from './academy-register/academy-register.component';
import {AcademyLoginComponent} from './academy-login/academy-login.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { AcademyCoursesComponent } from './academy-courses/academy-courses.component';
import { AcademyCourseComponent } from './academy-course/academy-course.component';
import { AcademyNavbarComponent } from './academy-navbar/academy-navbar.component';
import { AcademypanelComponent } from './academypanel/academypanel.component';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { AcademyHomeComponent } from './academy-home/academy-home.component';
import { AcademyInquiryListComponent } from './academy-inquiry-list/academy-inquiry-list.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { AdminActivityComponent } from './admin-activity/admin-activity.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes:Routes = [
{path:"",component:BootcampComponent},
{path:"login",component:AcademyLoginComponent},
{path:"admin",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"academyRegister",component:AcademyRegisterComponent},
{path:"user", component: UserComponent},
{path:"course", component: CourceComponent},
{path:"academy", component: AcademyComponent},
{path:"imageupload", component: ImageuploadComponent},
{path:"uploadFile", component: UploadTestComponent},
{path:"location", component:LocationComponent},
{path:"searchCourse",component:SearchCourceComponent},
{path:"program-status",component:ProgramStatusComponent},
{path:"CourseDetails",component:CourseDetailsComponent},
{path:"inquiry",component:InquiryComponent},
{path:"academyCourse",component:AcademyCoursesComponent},
{path:"singleAcademyCourse",component:AcademyCourseComponent},
{path:"academypanel",component:AcademypanelComponent},
{path:"inquiryList",component:InquiryListComponent},
{path:"academyHome",component:AcademyHomeComponent},
{path:"academyInquiries",component:AcademyInquiryListComponent},
{path:"profileupdate",component:ProfileupdateComponent},
{path:"adminactivity",component:AdminActivityComponent},
{path:"adminHome",component:AdminHomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
	  CourceComponent,
    UserComponent,
    AcademyComponent,
    NavbarComponent,
    UploadTestComponent,
    LoginComponent,
    LocationComponent,
    BootcampComponent,
    RegisterComponent,
    SearchCourceComponent,
    ProgramStatusComponent,
    CourseDetailsComponent,
    ImageuploadComponent,
    AcademyRegisterComponent,
    AcademyLoginComponent,
    InquiryComponent,
    InquiryListComponent,
    AcademyCoursesComponent,
    AcademyCourseComponent,
    AcademyNavbarComponent,
    AcademypanelComponent,
    AcademyHomeComponent,
    AcademyInquiryListComponent,
    ProfileupdateComponent,
    AdminActivityComponent,
    AdminHomeComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    MatAutocompleteModule,
    Ng2SearchPipeModule,
	  NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
