import {Component, OnInit, ViewChild} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";
import {Router} from "@angular/router";
import {AlertsService} from "../services/alerts.service";

@Component({
  selector: 'new-student-application',
  templateUrl: 'templates/new-student-application.component.html',
  styleUrls: ['stylesheets/new-student-application.component.css']
})
export class NewStudentApplicationComponent implements OnInit {

  @ViewChild('dropdown')
  dropdown: any;
  application = new StudentApplication(0, 0, 0, 0, 0, '', '', '', '', '', '');
  active = true;
  presentationOptions = ['Poster', 'Verbal'];

  constructor(private _applicationService: ApplicationService, private _router: Router, private _snackbar: AlertsService) {
  }

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

  getPresentationType(event) {
    setTimeout(() => {
      this.application.presentationOption = this.dropdown.nativeElement.value;
    }, 0);
  }
}
