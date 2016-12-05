import { Component, OnInit } from '@angular/core';
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";
import {Router} from "@angular/router";

@Component({
  selector: 'new-student-application',
  templateUrl: 'templates/new-student-application.component.html',
  styleUrls: ['stylesheets/new-student-application.component.css']
})
export class NewStudentApplicationComponent implements OnInit {

  application = new StudentApplication(0, 0, 0, 0, 0, '', '', '', '', '');
  active = true;
  presentationOptions = ['Poster', 'Verbal'];

  constructor(private _applicationService: ApplicationService, private _router: Router) { }

  ngOnInit() {
  }

  createApplication() {
    this.active = false;
    this._applicationService.createApplication(this.application).subscribe((res) => {
      if (!res.err) {
        this._router.navigate(['/']);
      }
    });
    setTimeout(() => this.active = true, 0);
  }
}
