import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StudentInterestComponent } from './components/student-interest/student-interest.component';
import { MoreInfosComponent } from './components/moreinfos/moreinfos.component';
import { TrainerHomeComponent } from './components/trainer-home/trainer-home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ManageCoursesTrainerComponent } from './components/manage-courses-trainer/manage-courses-trainer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactComponent } from './components/contact/contact.component';
import { TeamComponent } from './components/team/team.component';
import { ChatComponent } from './components/chat/chat.component';
import { ManagechaptersComponent } from './components/managechapters/managechapters.component';
import { CourseChaptersComponent } from './components/course-chapters/course-chapters.component';
import { GenerateCourseComponent } from './generate-course/generate-course.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'interest' , component: StudentInterestComponent},
  {path: 'trainer-home' , component: TrainerHomeComponent},
  {path:'moreinfos',component: MoreInfosComponent},
  {path:'courses',component:CoursesComponent},
  {path:'managecourses',component:ManageCoursesTrainerComponent},
  {path: 'about-us' , component: AboutUsComponent},
  {path: 'services' , component: OurServicesComponent},
  {path: 'contact' , component: ContactComponent},
  {path: 'team' , component: TeamComponent},
  {path:'chatbot' ,component: ChatComponent},
  {path: 'generatecourse' , component: GenerateCourseComponent},
  {path:'coursechapters/:courseId',component:CourseChaptersComponent},
  { path: 'managechapter/:courseId', component: ManagechaptersComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
