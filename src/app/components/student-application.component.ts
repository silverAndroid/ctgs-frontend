import {Component, OnInit, Input} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService, RecommendationModel} from "../services/application.service";
import {AlertsService} from "../services/alerts.service";
import {Constants} from "../constants";

@Component({
  selector: 'student-application',
  templateUrl: 'templates/student-application.component.html',
  styleUrls: ['stylesheets/student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

  @Input("data")
  application: StudentApplication;
  recommendationColour: string = 'inherit';
  private CONST_ACCEPTED = Constants.CONST_ACCEPTED;
  private CONST_REJECTED = Constants.CONST_REJECTED;

  constructor(private _applicationService: ApplicationService, private _alertService: AlertsService) {
    _applicationService.recommendation$.subscribe((recommendation) => {
      if (this.application.id == recommendation.applicationID)
        this.changeRecommendationColour(recommendation.wasAccepted ? this.CONST_ACCEPTED : this.CONST_REJECTED);
    });
  }

  ngOnInit() {
    this.changeRecommendationColour(this.application.recommendation);
  }

  acceptApplication() {
    this._applicationService.makeRecommendation(this.CONST_ACCEPTED, this.application.id).subscribe((res) => {
      if (!res.err) {
        this._applicationService.emitRecommendation(new RecommendationModel(this.application.id, true));
        this._alertService.showMsg(`${this.CONST_ACCEPTED} application`, false);
      }
    });
  }

  rejectApplication() {
    this._applicationService.makeRecommendation(this.CONST_REJECTED, this.application.id).subscribe((res) => {
      if (!res.err) {
        this._applicationService.emitRecommendation(new RecommendationModel(this.application.id, false));
        this._alertService.showMsg(`${this.CONST_REJECTED} application`, false);
      }
    });
  }

  changeRecommendationColour(recommendation: string) {
    if (recommendation == this.CONST_ACCEPTED)
      this.recommendationColour = 'green';
    else if (recommendation == this.CONST_REJECTED)
      this.recommendationColour = 'red';
    else if (recommendation.indexOf('Suggesting Changes') >= 0)
      this.recommendationColour = 'yellow';
  }
}
