import {Component, OnInit} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";

@Component({
  selector: 'app-home',
  templateUrl: 'templates/home.component.html',
  styleUrls: ['stylesheets/home.component.css']
})
export class HomeComponent implements OnInit {

  applications: StudentApplication[] = [new StudentApplication(3000.1, 100, 300, 80), new StudentApplication(200, 0.5, 500, 1000), new StudentApplication(4165347384783.4865, 4523, 453, 846), new StudentApplication(4865, 53, 865, 4865.54)];

  constructor() {
  }

  ngOnInit() {
  }
}
