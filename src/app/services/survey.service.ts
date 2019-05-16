import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { SurveyForm } from '../models/survey-form';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  public surveysList: AngularFireList<any>;
  public dataList: AngularFireList<any>;
  public surveyObject: AngularFireObject<any>;
  public currentD = '';
  public survey = {};
  constructor(private db: AngularFireDatabase, private router: Router) { }

  AddSurvey(survey: Survey, fecha: string) {
    this.surveysList.push({
      name: survey.name,
      order: survey.order,
      date: Date.now(),
      fecha: fecha,
      question1: survey.question1,
      question2: survey.question2,
      question3: survey.question3,
      question4: survey.question4,
      question5: survey.question5,
      question6: survey.question6,
      question7: survey.question7,
      question8: survey.question8
    });
  }

  GetSurveysList(key: string) {
    this.surveysList = this.db.list('data/' + key + '/surveys', ref =>
      ref.orderByChild('date')
    );
    return this.surveysList;
  }

  getOneSurvey(key: string, key2: string) {
    this.surveyObject = this.db.object('data/' + key + '/surveys' + key2);
    return this.surveyObject;
  }

  getAll(key: string) {
    return this.db.list('data/' + key + '/surveys')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  GetList() {
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('date').limitToLast(1)
    );
    return this.dataList;
  }

  GetDataList() {
    this.dataList = this.db.list('data', ref =>
      ref.orderByChild('date')
    );
    return this.dataList;
  }
/* 
  GetCurrent() {
    return this.db.list('data')
    .snapshotChanges().subscribe(res => {
      this.currentD = res.pop().key;
      this.getCurrentData().valueChanges().subscribe(data => {
        this.survey = data;        
      });
    });
  } */

  getCurrentData(key: string) {
    this.surveyObject = this.db.object('data/' + key);
    return this.surveyObject;
  }

  UpdateSurvey(surveyF: SurveyForm) {
    this.dataList.push({
      p1: surveyF.p1,
      p2: surveyF.p2,
      p3: surveyF.p3,
      p4: surveyF.p4,
      p5: surveyF.p5,
      p6: surveyF.p6,
      p7: surveyF.p7,
      p8: surveyF.p8,
      p9: surveyF.p9,
      date: Date.now()
    });
  }
}
