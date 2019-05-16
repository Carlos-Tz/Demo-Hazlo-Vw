import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SurveyService } from '../../services/survey.service';
import 'fecha';
import fechaObj from 'fecha';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  public fecha = '';
  public surveyForm: FormGroup;
  public surveyData = {};
  public survey = {
    name: 'nm',
    order: '22',
    fecha: '',
    date: null,
    question1: 7,
    question2: 2,
    question3: 5,
    question4: 'ee',
    question5: 6,
    question6: 'e',
    question7: 8,
    question8: '77ff'
  };

  constructor(
    public toastr: ToastrService,
    public surveyApi: SurveyService,
    public fb: FormBuilder
    ) { }

  ngOnInit() {
    this.surveyApi.GetList().snapshotChanges().subscribe(res => {
      const keyD = res.pop().key;
     // console.log(keyD);
      this.surveyApi.GetSurveysList(keyD);
      this.surveyApi.getCurrentData(keyD).valueChanges().subscribe(data => {
        this.surveyData = data;
      });
    });
    this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
    this.survey.fecha = this.fecha;
    this.sForm();
  }

  ResetForm() {
    this.surveyForm.reset();
  }

  submitSurveyData = () => {
    this.surveyApi.AddSurvey(this.surveyForm.value, this.fecha);
    this.toastr.success('Encuesta Enviada!');
    this.ResetForm();
  }

  sForm() {
    this.surveyForm = this.fb.group({
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      question1: ['', [Validators.required]],
      question2: ['', [Validators.required]],
      question3: ['', [Validators.required]],
      question4: [''],
      question5: ['', [Validators.required]],
      question6: [''],
      question7: ['', [Validators.required]],
      question8: [''],
      q1: [''],
      q2: [''],
      q3: [''],
      q4: [''],
      q5: [''],
      q6: [''],
      q7: [''],
      q8: [''],
      q9: [''],
      q10: [''],
      fecha: ['']
    });
  }
}
