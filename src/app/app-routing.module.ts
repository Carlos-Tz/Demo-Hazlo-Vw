import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';
import { ViewSurveyComponent } from './components/view-survey/view-survey.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: AddSurveyComponent},
  {path: 'stats/:key', component: DashboardComponent},
  {path: 'view/:key/:key2', component: ViewSurveyComponent},
  {path: 'panel', component: SurveyFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
