import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Survey } from 'src/app/models/survey';
import { SurveyService } from 'src/app/services/survey.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  @Input() public surveyForm: FormGroup;
  @Input() public survey: Survey;
  @Input() public submitSurveyData: any;
  @Input() public surveyData: any;
  @Input() public save: number;
  @Input() public goBack: any;

  constructor ( public surveyApi: SurveyService ) {  }

  ngOnInit(  ) {
  }
}
