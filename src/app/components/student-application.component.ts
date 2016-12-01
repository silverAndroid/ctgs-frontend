import {Component, OnInit, Input, HostListener} from '@angular/core';
import {StudentApplication} from "../models/student-application.model";

@Component({
  selector: 'student-application',
  templateUrl: 'templates/student-application.component.html',
  styleUrls: ['stylesheets/student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

  @Input("data")
  studentApplication : StudentApplication;
  constructor() { }

  ngOnInit() {
  }
}
