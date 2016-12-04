import {Component, OnInit, Input, HostListener} from '@angular/core';
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";

@Component({
  selector: 'student-application',
  templateUrl: 'templates/student-application.component.html',
  styleUrls: ['stylesheets/student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

  @Input("data")
  application : StudentApplication;
  recommendationColour: string = 'initial';
  constructor(private _applicationService: ApplicationService) { }

  ngOnInit() {
    let recommendation = this.application.recommendation;
    if (recommendation == 'Accepted')
      this.recommendationColour = 'green';
    else if (recommendation == 'Denied')
      this.recommendationColour = 'red';
    else if (recommendation.indexOf('Suggesting Changes') >= 0)
      this.recommendationColour = 'yellow';
  }

  acceptApplication() {
      this._applicationService.makeRecommendation('Accepted', this.application.id).subscribe((res) => {
        if (!res.err) {
          console.log('success');
        }
      });
  }
}
