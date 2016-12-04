/**
 * Created by silver_android on 04/12/16.
 */
import { Injectable } from '@angular/core';
import { MdSnackBarRef, MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertsService {
  public snackBarRef: MdSnackBarRef<any>;

  constructor(private snackBar: MdSnackBar) {}

  showMsg(msg: string, haveAction: boolean, actionLabel?: string, duration?: number) {
    const config: any = new MdSnackBarConfig(); // <-- https://github.com/angular/material2/issues/2020
    this.snackBarRef = this.snackBar.open(msg, haveAction && actionLabel, config);

    setTimeout(() => {
      this.snackBarRef.dismiss();
    }, (duration || 1) * 1000);
  }
}
