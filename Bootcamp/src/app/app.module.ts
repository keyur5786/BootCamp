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

const appRoutes:Routes = [
{path:"",component:BootcampComponent},
{path:"login",component:AcademyLoginComponent},
{path:"admin",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"academyRegister",component:AcademyRegisterComponent},
{path:"user", component: UserComponent},
{path:"cource", component: CourceComponent},
{path:"academy", component: AcademyComponent},
{path:"imageupload", component: ImageuploadComponent},
{path:"uploadFile", component: UploadTestComponent},
{path:"location", component:LocationComponent},
{path:"searchCourse",component:SearchCourceComponent},
{path:"program-status",component:ProgramStatusComponent},
{path:"CourseDetails",component:CourseDetailsComponent},
{path:"inquiry",component:InquiryComponent},
{path:"academyCourse",component:AcademyCoursesComponent},
{path:"singleAcademyCourse",component:AcademyCourseComponent}
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
    AcademyCoursesComponent,
    AcademyCourseComponent,
    AcademyNavbarComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
