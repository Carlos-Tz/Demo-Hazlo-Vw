import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from 'src/app/services/survey.service';
import { Survey } from 'src/app/models/survey';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {
  public fecha = '';
  public surveyForm: FormGroup;
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
  public surveyData = {};
  public save = 1;

  constructor(
    public toastr: ToastrService,
    public surveyApi: SurveyService,
    public fb: FormBuilder,
    private location: Location,
    private actRouter: ActivatedRoute
    ) { }

  ngOnInit() {
   // this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
   // this.surveyApi.GetSurveysList();
    const key = this.actRouter.snapshot.paramMap.get('key');
    const key2 = this.actRouter.snapshot.paramMap.get('key2');
    /* this.surveyApi.getOneSurvey(key, key2).valueChanges().subscribe(data => {
      this.surveyData = data;
      this.survey = 
    }); */
    this.surveyApi.getCurrentData(key).valueChanges().subscribe(data => {
      this.surveyData = data;
      this.survey = data.surveys[key2];
     // console.log(this.survey.question1);
    });
    /* this.survey = this.surveyData.surveys. */
    this.sForm();
  }

  submitSurveyData = () => {
   // this.surveyApi.AddSurvey(this.surveyForm.value, this.fecha);
    this.toastr.info('Opción deshabilitada!');
   // this.ResetForm();
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

  goBack = () => {
    this.location.back();
  }
}
