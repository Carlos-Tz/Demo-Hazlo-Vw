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
    name: '',
    order: '',
    fecha: '',
    date: null,
    question1: null,
    question2: null,
    question3: null,
    question4: '',
    question5: null,
    question6: '',
    question7: null,
    question8: ''
  };
  public save = 0;

  constructor(
    public toastr: ToastrService,
    public surveyApi: SurveyService,
    public fb: FormBuilder
    ) { }

  ngOnInit() {
    this.surveyApi.GetList().snapshotChanges().subscribe(res => {
      if (res.length > 0) {
        const keyD = res.pop().key;
        this.surveyApi.GetSurveysList(keyD);
        this.surveyApi.getCurrentData(keyD).valueChanges().subscribe(data => {
          this.surveyData = data;
        });
      } else {
        return;
      }
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
      fecha: ['']
    });
  }
}
