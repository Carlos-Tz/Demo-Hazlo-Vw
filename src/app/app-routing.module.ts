import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';
import { ViewSurveyComponent } from './components/view-survey/view-survey.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { LoginComponent } from './components/login/login.component';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: AddSurveyComponent},
  {path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  {path: 'stats/:key', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'view/:key/:key2', component: ViewSurveyComponent, canActivate: [AuthGuard]},
  {path: 'panel', component: SurveyFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
