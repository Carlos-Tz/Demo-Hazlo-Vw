import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey';

/* import { AuthService } from '../../shared/auth.service'; */
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import 'fecha';
import fechaObj from 'fecha';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p = 1;
  Survey: Survey[];
  key = '';
  currentData = {
    p2: '',
    p3: '',
    p4: '',
    p6: '',
    p8: ''
  };
  
  dtOptions = {};
  fecha = '';
  save = 1;

  // public filter_Key: string;
  filter_key = '';
  surveys = [];
  dataSource: Observable<any>;
  chartdata = false;
  view: number[] = [400, 300];
  showLegend = false;
  colorScheme = {
    domain: ['#f44336', '#40c4ff', '#ff9800', '#9575cd ', '#ffeb3b', '#795548', '#cddc39', '#81c784', '#607d8b', '#4caf50']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  p1 = []; p2 = []; p3 = []; p4 = []; p5 = [];
  p1Data = []; p2Data = []; p3Data = []; p4Data = []; p5Data = [];

  constructor(
    public surveyApi: SurveyService,
    private actRouter: ActivatedRoute,
    private location: Location/* ,
    public authService: AuthService */
  ) { }

  ngOnInit() {
    this.fecha = fechaObj.format(new Date(), 'D [de] MMMM [de] YYYY');
    this.p1 = []; this.p2 = []; this.p3 = []; this.p4 = []; this.p5 = [];
    this.p1Data = []; this.p2Data = []; this.p3Data = []; this.p4Data = []; this.p5Data = [];
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.dataSource = this.surveyApi.getAll(this.key);
    this.surveyApi.getCurrentData(this.key).valueChanges().subscribe(data => {
      this.currentData = data;
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        {
          extend: 'print',
          title: 'Hazlo Volkswagen a ' + this.fecha,
          text: 'Imprimir tabla'
        },
        {
          extend: 'excel',
          title: 'Hazlo Volkswagen a ' + this.fecha,
          text: 'Exportar a Excel'
        }
      ],
      language: {
        paginate: {
            first:    '«',
            previous: '‹',
            next:     '›',
            last:     '»'
        },
        aria: {
            paginate: {
                first:    'Primero',
                previous: 'Anterior',
                next:     'Siguiente',
                last:     'Último'
            }
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
        search: 'Buscar'
      }
    };

    /* this.surveyApi.GetSurveysList(this.key).snapshotChanges().subscribe(data => {
      this.Survey = [];
      data.forEach(item => {
        const surv = item.payload.toJSON();
        surv['$key'] = item.key;
        this.Survey.push(surv as Survey);
      });
      this.Survey.reverse();
    }); */
    this.dataSource.forEach(val => {
      this.chartdata = true;
      val.forEach(element => {
        this.surveys.push(element);

        if (this.p1[element.question1]) { this.p1[element.question1] += 1; } else { this.p1[element.question1] = 1; }
        if (this.p2[element.question2]) { this.p2[element.question2] += 1; } else { this.p2[element.question2] = 1; }
        if (this.p3[element.question3]) { this.p3[element.question3] += 1; } else { this.p3[element.question3] = 1; }
        if (this.p4[element.question5]) { this.p4[element.question5] += 1; } else { this.p4[element.question5] = 1; }
        if (this.p5[element.question7]) { this.p5[element.question7] += 1; } else { this.p5[element.question7] = 1; }

      });
// tslint:disable-next-line: forin
      for (let key in this.p1) {
        const singleentry = {
          name: key,
          value: this.p1[key]
        };
        this.p1Data.push(singleentry);
      }
// tslint:disable-next-line: forin
      for (let key in this.p2) {
        let singleentry = {
          name: key,
          value: this.p2[key]
        };
        this.p2Data.push(singleentry);
      }
// tslint:disable-next-line: forin
      for (let key in this.p3) {
        let singleentry = {
          name: key,
          value: this.p3[key]
        };
        this.p3Data.push(singleentry);
      }
// tslint:disable-next-line: forin
      for (let key in this.p4) {
        let singleentry = {
          name: key,
          value: this.p4[key]
        };
        this.p4Data.push(singleentry);
      }
// tslint:disable-next-line: forin
      for (let key in this.p5) {
        let singleentry = {
          name: key,
          value: this.p5[key]
        };
        this.p5Data.push(singleentry);
      }
    });
  }

  goBack = () => {
    this.location.back();
  }
}
