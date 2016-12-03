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

  constructor(private _applicationService: ApplicationService, private _cookieService: CookieService) {
  }

  ngOnInit() {
    this._applicationService.getApplications().subscribe((res) => {
      if (!res.err) {
        let applications: StudentApplication[] = [];
        res.data.forEach((object) => {
          applications.push(new StudentApplication(
            object.registration,
            object.transportation,
            object.accommodation,
            object.meals,
            object.owner,
            HTTPConnection.getRole(this._cookieService)
          ))
        });
        this.applications = applications;
      }
    });
  }
}
