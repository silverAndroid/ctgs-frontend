import {Component, OnInit, Input} from "@angular/core";
import {StudentApplication} from "../models/student-application.model";
import {ApplicationService, RecommendationModel} from "../services/application.service";
import {AlertsService} from "../services/alerts.service";
import {Constants} from "../constants";
import {GoogleMapsService} from "../services/google-maps.service";
import {LocationModel} from "../models/location.model";

@Component({
    selector: 'student-application',
    templateUrl: 'templates/student-application.component.html',
    styleUrls: ['stylesheets/student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

    @Input("data")
    application: StudentApplication;
    recommendationColour: string = 'inherit';
    hasLocation = false;
    location: LocationModel;
    startDate: string;
    endDate: string;

    private CONST_ACCEPTED = Constants.CONST_ACCEPTED;
    private CONST_REJECTED = Constants.CONST_REJECTED;

    constructor(private _applicationService: ApplicationService, private _googleMapsService: GoogleMapsService, private _snackbar: AlertsService) {
        _applicationService.recommendation$.subscribe((recommendation) => {
            if (this.application.id == recommendation.applicationID)
                this.changeRecommendationColour(recommendation.wasAccepted ? this.CONST_ACCEPTED : this.CONST_REJECTED);
        });
    }

    ngOnInit() {
        this.changeRecommendationColour(this.application.recommendation);
        this.getLocation();
        this.parseDates();
    }

    parseDates() {
        this.startDate = this.application.conferenceStartDateTime.toUTCString();
        this.endDate = this.application.conferenceEndDateTime.toUTCString();
    }

    acceptApplication() {
        this._applicationService.makeRecommendation(this.CONST_ACCEPTED, this.application.id).subscribe((res) => {
            if (!res.err) {
                this._applicationService.emitRecommendation(new RecommendationModel(this.application.id, true));
            }
            this._snackbar.showMsg(res.message, false);
        });
    }

    rejectApplication() {
        this._applicationService.makeRecommendation(this.CONST_REJECTED, this.application.id).subscribe((res) => {
            if (!res.err) {
                this._applicationService.emitRecommendation(new RecommendationModel(this.application.id, false));
            }
            this._snackbar.showMsg(res.message, false);
        });
    }

    changeRecommendationColour(recommendation: string) {
        if (recommendation == this.CONST_ACCEPTED)
            this.recommendationColour = 'green';
        else if (recommendation == this.CONST_REJECTED)
            this.recommendationColour = 'red';
        else if (recommendation.indexOf('Suggesting Changes') >= 0)
            this.recommendationColour = 'yellow';
    }

    getLocation() {
        this._googleMapsService.getMapsURL(this.application.conferenceLocation).subscribe(res => {
            if (!res.err) {
                let object = res.data;
                this.location = new LocationModel(object.name, undefined, object.url);
                this.hasLocation = true;
            } else {
                this._snackbar.showMsg('Failed to load location', false);
            }
        });
    }
}
