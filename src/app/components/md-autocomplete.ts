/**
 * Created by silver_android on 06/12/16.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "md-autocomplete",
  templateUrl: 'templates/md-autocomplete.component.html',
})
export class MdAutocomplete implements OnInit {
  @Input()
  placeholder: string;

  @Input()
  required: boolean = false;

  @Input()
  items = [];

  @Input()
  itemText: string;

  @Input()
  getMatches: Function;

  @Input()
  selectedItem;

  @Output()
  selectedItemChange = new EventEmitter();

  @Input()
  searchText: string;

  @Output()
  searchTextChange = new EventEmitter();

  popupVisible = false;

  private matches = [];

  ngOnInit() {
    this.setMatches();
  }

  onEnter() {
    this.setMatches();
    this.popupVisible = true;
  }

  onLeave() {
    this.popupVisible = false;
  }

  //[(value)] is buggy and does not propagate changes on the md-input so we can get the value correctly
  onKeyUp(event) {
    this.searchText = event.target.value;
    this.searchTextChange.emit(this.searchText);

    this.setMatches();
  }

  select(item) {
    this.selectedItemChange.emit(item);
    this.searchText = item[this.itemText];
    this.popupVisible = false;
  }

  private setMatches() {
    if (this.searchText) {
      this.matches = this.getMatches(this.searchText);
    } else {
      this.matches = this.items;
    }
  }
}
