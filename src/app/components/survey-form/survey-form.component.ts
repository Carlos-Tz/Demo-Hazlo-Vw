import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SurveyService } from 'src/app/services/survey.service';
import { ToastrService } from 'ngx-toastr';
import { SurveyForm } from 'src/app/models/survey-form';


@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  public surveyF: FormGroup;
  public currentData = {};
  public dataList = [];

  constructor(
    private toastr: ToastrService,
    private surveyApi: SurveyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.surveyApi.GetList().snapshotChanges().subscribe(res => {
      const keyD = res.pop().key;
      this.surveyApi.getCurrentData(keyD).valueChanges().subscribe(data => {
        this.currentData = data;
      });
      this.surveyApi.GetDataList().snapshotChanges().subscribe(re => {        
        this.dataList = [];
        re.forEach(item => {
          const surv = item.payload.toJSON();
          surv['$key'] = item.key;
          this.dataList.push(surv as SurveyForm);
        });
        this.dataList.reverse();
        //this.dataList = re.reverse();
      });
    });
    this.sForm();
  }

  sForm() {
    this.surveyF = this.fb.group({
      p1: ['', [Validators.required]],
      p2: ['', [Validators.required]],
      p3: ['', [Validators.required]],
      p4: ['', [Validators.required]],
      p5: ['', [Validators.required]],
      p6: ['', [Validators.required]],
      p7: ['', [Validators.required]],
      p8: ['', [Validators.required]],
      p9: ['', [Validators.required]]
    });
  }

  submitSurveyData() {
    this.surveyApi.UpdateSurvey(this.surveyF.value);
    this.toastr.success('Actualizado!');
  }
}
