import {Component, OnInit} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ApplicationService} from "../services/application.service";
import {HTTPConnection} from "../services/http.connection";

@Component({
  selector: 'app-home',
  templateUrl: 'templates/home.component.html',
  styleUrls: ['stylesheets/home.component.css']
})
export class HomeComponent implements OnInit {

  applications: StudentApplication[] = [];
  pendingApplications: StudentApplication[] = [];
  cancelledApplications: StudentApplication[] = [];
  role: string = HTTPConnection.getRole(this._cookieService);

  constructor(private _applicationService: ApplicationService, private _cookieService: CookieService) {
  }

  ngOnInit() {
    this._applicationService.getApplications().subscribe((res) => {
      if (!res.err) {
        let applications: StudentApplication[] = [];
        res.data.forEach((object) => {
          let application: StudentApplication = new StudentApplication(
            object.id,
            object.registration,
            object.transportation,
            object.accommodation,
            object.meals,
            object.owner,
            object.recommendation,
            this.role
          );
          if (!(application.recommendation == 'Cancelled' && this.role != 'student'))
            applications.push(application);
          if (application.recommendation == 'Pending')
            this.pendingApplications.push(application);
          else if (application.recommendation == 'Cancelled')
            this.pendingApplications.push(application);
        });
        this.applications = applications;
      }
    });
  }
}
