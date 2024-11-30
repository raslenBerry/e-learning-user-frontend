import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TrainerHomeComponent } from './components/trainer-home/trainer-home.component';
import { StudentInterestComponent } from './components/student-interest/student-interest.component';
import { UserheaderComponent } from './components/userheader/userheader.component';
import { UserFooterComponent } from './components/user-footer/user-footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { FeaturesComponent } from './components/features/features.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FaqComponent } from './components/faq/faq.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';
import { MoreInfosComponent } from './components/moreinfos/moreinfos.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TrainerHeaderComponent } from './components/trainer-header/trainer-header.component';
import { ManageCoursesTrainerComponent } from './components/manage-courses-trainer/manage-courses-trainer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    StudentInterestComponent,
    TrainerHomeComponent,
    UserheaderComponent,
    UserFooterComponent,
    AboutUsComponent,
    OurServicesComponent,
    FeaturesComponent,
    CallToActionComponent,
    PricingComponent,
    FaqComponent,
    TeachersComponent,
    TeamComponent,
    ContactComponent,
    MoreInfosComponent,
    CoursesComponent,
    TrainerHeaderComponent,
    ManageCoursesTrainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      progressBar: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }