/**
 * Created by silver_android on 06/12/16.
 */
export class LocationModel {
  constructor(private _placeID: string, private _name: string){}

  get placeID(): string {
    return this._placeID;
  }

  set placeID(value: string) {
    this._placeID = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
