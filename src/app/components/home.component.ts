import {Component, OnInit} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ApplicationService} from "../services/application.service";
import {HTTPConnection} from "../services/http.connection";
import {Constants} from "../constants";
import {AlertsService} from "../services/alerts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'templates/home.component.html',
  styleUrls: ['stylesheets/home.component.css']
})
export class HomeComponent implements OnInit {

  applications: StudentApplication[] = [];
  pendingApplications: StudentApplication[] = [];
  role: string = HTTPConnection.getRole(this._cookieService);

  constructor(private _applicationService: ApplicationService, private _cookieService: CookieService, private _snackbar: AlertsService, private _router: Router) {
    if (this.role != 'admin') {
      _applicationService.recommendation$.subscribe((recommendation) => {
        let newApplication: StudentApplication = null;
        this.applications.map((application) => {
          if (application.id == recommendation.applicationID) {
            newApplication = application;
            application.recommendation = recommendation.wasAccepted ? Constants.CONST_ACCEPTED : Constants.CONST_REJECTED;
          }
          return application;
        });
        let index = this.pendingApplications.indexOf(newApplication);
        if (index > -1)
          this.pendingApplications.splice(index, 1);
      });
    }
  }

  ngOnInit() {
    let role = HTTPConnection.getRole(this._cookieService);
    let username = HTTPConnection.getUser(this._cookieService);
    if (role == 'admin')
      this._router.navigate(['/register']);
    else {
      this._applicationService.getApplications(role, username).subscribe((res) => {
        if (!res.err) {
          let applications: StudentApplication[] = [];
          res.data.forEach((object) => {
            // TODO: Fix constructor for Student Application
            let application: StudentApplication = new StudentApplication(
              object.id,
              object.registration,
              object.transportation,
              object.accommodation,
              object.meals,
              object.owner,
              object.recommendation,
              object.conference_detail,
              object.presentation_title,
              object.presentation_type,
              new Date(),
              '',
              this.role
            );
            applications.push(application);
            if (application.recommendation == Constants.CONST_PENDING)
              this.pendingApplications.push(application);
          });
          this.applications = applications;
        } else {
          this._snackbar.showMsg('Failed to retrieve applications', false);
        }
      });
    }
  }
}
