import {Component, OnInit, ViewChild} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService} from "../services/application.service";
import {Router} from "@angular/router";
import {AlertsService} from "../services/alerts.service";
import {GoogleMapsService} from "../services/google-maps.service";
import {LocationModel} from "../models/location.model";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'new-student-application',
  templateUrl: 'templates/new-student-application.component.html',
  styleUrls: ['stylesheets/new-student-application.component.css']
})
export class NewStudentApplicationComponent implements OnInit {

  application = new StudentApplication(0, 0, 0, 0, 0, '', '', '', '', '', new Date(), new Date(), '', '');
  active = true;
  presentationOptions = ['Poster', 'Verbal'];
  locations: LocationModel[] = [];
  page = 0;
  subscription: Subscription;

  form: NgForm;
  @ViewChild('newApplicationForm')
  currentForm: NgForm;
  formErrors = {
    registration: '',
    transportation: '',
    accommodation: '',
    meals: '',
    conferenceDescript: '',
    startDate: '',
    endDate: '',
    presentationTitle: ''
  };
  validationMessages = {
    registration: {
      moneyValidator: 'Invalid currency'
    },
    transportation: {
      moneyValidator: 'Invalid currency'
    },
    accommodation: {
      moneyValidator: 'Invalid currency'
    },
    meals: {
      moneyValidator: 'Invalid currency'
    },
    conferenceDescript: {
      required: 'Field cannot be empty'
    },
    startDate: {
      dateTimeValidator: 'Date must follow the format dd/mm/yyyy and time must follow the format HH:MM'
    },
    endDate: {
      dateTimeValidator: 'Date must follow the format dd/mm/yyyy and time must follow the format HH:MM'
    },
    presentationTitle: {
      alphaFirstValidator: 'The first character must be a letter'
    }
  };

  constructor(private _applicationService: ApplicationService, private _router: Router, private _googleMapsService: GoogleMapsService, private _snackbar: AlertsService) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {

  }

  formChanged() {
    if (this.form == this.currentForm)
      return;
    this.form = this.currentForm;
    if (this.form)
      this.form.valueChanges.subscribe(data => {
        this.onValueChanged(data);
      });
  }

  onValueChanged(data: any) {
    if (!this.form)
      return;
    const form = this.form;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      /*const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }*/
    }
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
    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = this._googleMapsService.search(searchText).subscribe(res => {
      res.data.forEach(object => {
        locations.push(new LocationModel(object.description, object.place_id))
      });
    });
    return locations;
  }
}
