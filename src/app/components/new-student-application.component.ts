import {Component, OnInit, ViewChild} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";
import {Router} from "@angular/router";
import {AlertsService} from "../services/alerts.service";
import {GoogleMapsService} from "../services/google-maps.service";
import {LocationModel} from "../models/location.model";

@Component({
  selector: 'new-student-application',
  templateUrl: 'templates/new-student-application.component.html',
  styleUrls: ['stylesheets/new-student-application.component.css']
})
export class NewStudentApplicationComponent implements OnInit {

  application = new StudentApplication(0, 0, 0, 0, 0, '', '', '', '', '', new Date(), '', '');
  active = true;
  presentationOptions = ['Poster', 'Verbal'];
  locations : LocationModel[] = [];
  page = 0;

  constructor(private _applicationService: ApplicationService, private _router: Router, private _googleMapsService: GoogleMapsService, private _snackbar: AlertsService) {}

  ngOnInit() {
  }

  createApplication() {
    this.active = false;
    this._applicationService.createApplication(this.application).subscribe((res) => {
      if (!res.err) {
        this._router.navigate(['/']);
        this._snackbar.showMsg('Created application successfully', false);
      } else {
        this._snackbar.showMsg('Failed to create application', false);
      }
    });
    setTimeout(() => this.active = true, 0);
  }

  searchGoogleMaps(items: any[], itemText: string, searchText: string) {
    let locations: LocationModel[] = [];
    this._googleMapsService.search(searchText).subscribe(res => {
      console.table(res);
      console.log(res);
      locations = locations.concat(res.data.predictions);
    });
    return locations.copyWithin(0, 0, 5);
  }
}
