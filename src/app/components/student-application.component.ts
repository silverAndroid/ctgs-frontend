import {Component, OnInit, Input, HostListener} from '@angular/core';
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";
import {AlertsService} from "../services/alerts.service";

@Component({
  selector: 'student-application',
  templateUrl: 'templates/student-application.component.html',
  styleUrls: ['stylesheets/student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

  @Input("data")
  application : StudentApplication;
  recommendationColour: string = 'inherit';
  constructor(private _applicationService: ApplicationService, private _alertService: AlertsService) { }

  ngOnInit() {
    let recommendation = this.application.recommendation;
    if (recommendation == 'Accepted')
      this.recommendationColour = 'green';
    else if (recommendation == 'Rejected')
      this.recommendationColour = 'red';
    else if (recommendation.indexOf('Suggesting Changes') >= 0)
      this.recommendationColour = 'yellow';
  }

  acceptApplication() {
      this._applicationService.makeRecommendation('Accepted', this.application.id).subscribe((res) => {
        if (!res.err) {
          this._alertService.showMsg('Accepted application', false);
        }
      });
  }

  rejectApplication() {
    this._applicationService.makeRecommendation('Rejected', this.application.id).subscribe((res) => {
      if (!res.err) {
        this._alertService.showMsg('Rejected application', false);
      }
    });
  }
}
