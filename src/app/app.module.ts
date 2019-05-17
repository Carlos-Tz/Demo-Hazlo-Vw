import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SurveyComponent } from './components/survey/survey.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyFormComponent } from './components/survey-form/survey-form.component';
import { ViewSurveyComponent } from './components/view-survey/view-survey.component';
import { AddSurveyComponent } from './components/add-survey/add-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    DashboardComponent,
    SurveyFormComponent,
    ViewSurveyComponent,
    AddSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxChartsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
