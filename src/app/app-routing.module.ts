import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginRegisterComponent } from './components/loginregister/loginregister.component';
import { StudentInterestComponent } from './components/student-interest/student-interest.component';
import { MoreInfosComponent } from './components/moreinfos/moreinfos.component';
import { TrainerHomeComponent } from './components/trainer-home/trainer-home.component';
import { CoursesComponent } from './components/courses/courses.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reset-password', component: ResetPasswordComponent }, 
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'loginregister', component: LoginRegisterComponent },
  {path: 'interest' , component: StudentInterestComponent},
  {path: 'trainer-home' , component: TrainerHomeComponent},
  {path:'moreinfos',component: MoreInfosComponent},
  {path:'courses',component:CoursesComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
